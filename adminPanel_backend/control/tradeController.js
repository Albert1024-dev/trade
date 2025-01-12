const { Positions, User, UserPermission, Symbols, Assets, Commission, Leverage } = require("../models");
const global = require("../config/global");
const { where } = require("sequelize");
const symbols = require("../models/symbols");
const permission = require("../config/permission");

// const Symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF']
// const leverage = 1, pip_size = 0.0001, commission = 0.03;               //////getUserInfo from data
 
// exports.createPosition = async (req, res) => {

//     console.log(" Hello createPosition data ");

//     // console.log("data : ", req.body);
//     const { amount, symbol, option } = req.body;
    
//     const user = await User.findOne({ where: { token: req.headers.authorization } })
//     const { balance, usedMargin } = user;
//     const symbolIndex = await Symbols.findOne({ where: { code: symbol } });
//     const leverage_all = await Leverage.findOne({ where: { companyEmail: user.companyEmail } });
//     const leverage = leverage_all[`${symbolIndex.assetName}`]
//     // console.log("leverage" ,leverage_all,symbolIndex.assetName,",", leverage);

//     const asset = await Assets.findOne({ where: { name: symbolIndex.assetName } });
//     const commissions = await Commission.findOne({ where: { companyEmail: user.companyEmail } });
//     const commission = commissions[`${symbolIndex.assetName}`] * amount / 0.01;
//     // console.log(symbolIndex.assetName, commission);
//     const pip_size = asset.pip_size;
//     const symbolID = symbolIndex.id;
//     const updateMargin = (usedMargin + amount / pip_size * (option ? global.bids[global.symbols.indexOf(symbol)] : global.asks[global.symbols.indexOf(symbol)]) * leverage).toFixed(2);
//     // console.log(usedMargin, amount, pip_size, (option ? global.bids[global.symbols.indexOf(symbol)] : global.asks[global.symbols.indexOf(symbol)]));
//     // console.log(updateMargin + commission, ",", balance, ",", Number(updateMargin) + Number(commission) > Number(balance));
//     if (Number(updateMargin) + Number(commission) > balance) {
//         res.status(200).json({ state: "Your balance is not enough" });
//         return;
//     }
//     await Positions.create({
//         userID: user.id,
//         type: option ? "Sell" : "Buy",
//         size: amount,
//         status: 'Open',
//         symbolName: symbol,
//         commission: commission,
//         leverage: leverage,
//         startPrice: option ? global.bids[global.symbols.indexOf(symbol)] : global.asks[global.symbols.indexOf(symbol)],
//     });

//     await User.update({ balance: balance, usedMargin: updateMargin ? updateMargin : 0 }, { where: { id: user.id } });
//     const PositionList = await Positions.findAll({ where: { status: 'Open', userID: user.id } });

//     res.status(200).json({ positions: PositionList, balance: user.balance, margin: updateMargin });
// };

exports.createPosition = async (req, res) => {
    console.log("Hello createPosition data", req.body);

    const { amount, symbol, option } = req.body;

    try {
        const user = await User.findOne({ where: { token: req.headers.authorization } });
        const { balance, usedMargin } = user;
        console.log("User Balance:", balance, "User Used Margin:", usedMargin);

        const symbolIndex = await Symbols.findOne({ where: { code: symbol } });
        const leverage_all = await Leverage.findOne({ where: { companyEmail: user.companyEmail } });
        const leverage = parseFloat(leverage_all[`${symbolIndex.assetName}`]) || 1;
        console.log("Leverage:", leverage);

        const asset = await Assets.findOne({ where: { name: symbolIndex.assetName } });
        const commissions = await Commission.findOne({ where: { companyEmail: user.companyEmail } });
        const commissionValue = parseFloat(commissions[`${symbolIndex.assetName}`]);
        const commission = commissionValue * amount / 0.01 || 0;
        console.log("Commission Value:", commissionValue, "Commission Calculated:", commission);

        const pip_size = parseFloat(asset.pip_size) || 0.0001;
        const currentPrice = option ? global.bids[global.symbols.indexOf(symbol)] : global.asks[global.symbols.indexOf(symbol)];
        const updateMargin = parseFloat((usedMargin + amount / pip_size * currentPrice * leverage).toFixed(2)) || 0;
        console.log("Current Price:", currentPrice, "Update Margin:", updateMargin);

        if (Number(updateMargin) + Number(commission) > Number(balance)) {
            res.status(200).json({ state: "Your balance is not enough" });
            return;
        }

        await Positions.create({
            userID: user.id,
            type: option ? "Sell" : "Buy",
            size: amount,
            status: 'Open',
            symbolName: symbol,
            commission: commission,
            leverage: leverage,
            startPrice: currentPrice,
        });

        await User.update({ balance: balance - commission, usedMargin: updateMargin }, { where: { id: user.id } });

        const PositionList = await Positions.findAll({ where: { status: 'Open', userID: user.id } });

        res.status(200).json({ positions: PositionList, balance: balance - commission, margin: updateMargin });
    } catch (error) {
        console.error("Error in createPosition:", error);
        res.status(500).json({ error: "An error occurred while creating position." });
    }
};




exports.closePosition = async (req, res) => {
    // console.log("cacelID : ", req.body);

    console.log("create_trigger");
    
    const { id } = req.body;
    const closePosition = await Positions.findOne({ where: { id: id, status: 'Open' } });
    const user = await User.findOne({ where: { token: req.headers.authorization } })
    const leverage = closePosition.leverage;
    const { balance, usedMargin } = user;
 
    if (!closePosition) {
        res.status(400).json("Already Trade");
        return;
    }
    const symbolIndex = await Symbols.findOne({ where: { code: closePosition.symbolName } });
    const asset = await Assets.findOne({ where: { name: symbolIndex.assetName } });
    const pip_size = asset.pip_size;
    const updateMargin = usedMargin - (closePosition.size / pip_size * closePosition.startPrice) * leverage.toFixed(2);
    const stopPrice = closePosition.type != "Sell" ? global.bids[global.symbols.indexOf(closePosition.symbolName)] : global.asks[global.symbols.indexOf(closePosition.symbolName)];
    const profit = (closePosition.type == "Sell" ? -1 : 1) * (stopPrice - closePosition.startPrice) / pip_size * closePosition.size * leverage - closePosition.commission;
    const updateBalance = balance + profit;

    await Positions.update({
        startPrice: closePosition.startPrice,
        status: "Close",
        stopPrice: stopPrice,
        stopLoss: closePosition.stopLoss,
        takeProfit: closePosition.takeProfit,
        commission: closePosition.commission,
        realProfit: profit,
        closeReason: "UserClose",
    }, {where : {id: closePosition.id}});
    await User.update({ usedMargin: updateMargin ? updateMargin : 0, balance: updateBalance }, { where: { id: user.id } });

    const PositionList = await Positions.findAll({ where: { status: 'Open', userID: user.id } });
    const RealPositionList = await Positions.findAll({ where: { status: 'Close', userID: user.id } });
    res.status(200).json({ positions: PositionList, realPositions: RealPositionList, margin: updateMargin, balance: balance });
};

exports.checkPosition = async () => {
    const PositionList = await Positions.findAll({ where: { status: 'Open' } });

    for (const position of PositionList) {
        const symbolIndex = await Symbols.findOne({ where: { code: position.symbolName } });
        const asset = await Assets.findOne({ where: { name: symbolIndex.assetName } });
        const user = await User.findOne({ where: { id: position.userID } })
        const pip_size = asset.pip_size;
        const stopPrice = position.type != "Sell" ? global.bids[global.symbols.indexOf(position.symbolName)] : global.asks[global.symbols.indexOf(position.symbolName)];
        const profit = (position.type != "Sell" ? -1 : 1) * (stopPrice - position.startPrice) / pip_size * position.size * position.leverage - position.commission;
        if (profit > position.takeProfit && position.takeProfit > 0) {
            const user = await User.findOne({ where: { id: position.userID } })
            const { balance, usedMargin } = user;
            const updateMargin = usedMargin - (position.size / pip_size * position.startPrice * position.leverage).toFixed(2);
            const updateBalance = balance + profit;

            const destroyPosition = await Positions.findOne({ where: { id: position.id } });
            if (destroyPosition) {
                await Positions.update({
                    startPrice: position.startPrice,
                    status: "Close",
                    stopPrice: stopPrice,
                    stopLoss: position.stopLoss,
                    takeProfit: position.takeProfit,
                    commission: position.commission,
                    realProfit: profit,
                    closeReason: "TakeProfit",
                }, { where: { id: position.id } });
                await User.update({ usedMargin: updateMargin ? updateMargin : 0, balance: updateBalance }, { where: { id: user.id } });
            }
        }
        if (-profit > position.stopLoss && position.stopLoss > 0) {
            const user = await User.findOne({ where: { id: position.userID } })
            const { balance, usedMargin } = user;
            const updateMargin = usedMargin - (position.size / pip_size * position.startPrice * position.leverage).toFixed(2);
            const updateBalance = balance + profit;

            const destroyPosition = await Positions.findOne({ where: { id: position.id } });
            if (destroyPosition) {
                await Positions.update({
                    startPrice: position.startPrice,
                    status: "Close", 
                    stopPrice: stopPrice,
                    stopLoss: position.stopLoss,
                    takeProfit: position.takeProfit,
                    commission: position.commission,
                    realProfit: profit,
                    closeReason: "StopLose",
                }, { where: { id: position.id } });
                await User.update({ usedMargin: updateMargin ? updateMargin : 0, balance: updateBalance }, { where: { id: user.id } });
            }
        }
    }
};

exports.getAllPosition = async (req, res) => {
    const user = await User.findOne({ where: { token: req.headers.authorization } })
    const PositionList = await Positions.findAll({ where: { status: "Open", userID: user.id } });
    const RealPositionList = await Positions.findAll({ where: { status: "Close", userID: user.id } });

    res.status(200).json({ positions: PositionList, realPositions: RealPositionList, margin: user.usedMargin, balance: user.balance });
}

exports.updatePosition = async (req, res) => {
    const { updateID, updateProfit, updateLoss } = req.body

    await Positions.update({ takeProfit: Number(updateProfit), stopLoss: Number(updateLoss) }, { where: { id: updateID } })

    const PositionList = await Positions.findAll({ where: { status: "Open", userID: user.id } });

    res.status(200).json({ positions: PositionList });
}

exports.getSymbols = async (req, res) => {
    try {
        const symbols = await Symbols.findAll({ attributes: ['code', 'name', 'type', 'assetName'] });

        // Use map to create an array of promises
        const new_symbols = await Promise.all(symbols.map(async (symbol) => {
            const asset = await Assets.findOne({ where: { name: symbol.assetName } });
            return {
                code: symbol.code,
                name: symbol.name,
                type: symbol.type,
                assetName: symbol.assetName,
                pip_size: asset ? asset.pip_size : null // Handle the case where the asset is not found
            };
        }));

        return res.status(200).json(new_symbols);
    } catch (error) {
        console.error('Error fetching symbols with pip_size:', error);
        return res.status(500).json({ error: 'An error occurred while fetching symbols.' });
    }
}

exports.getTradingDatas = async (req, res) => {
    const user = await User.findOne({ where: { token: req.headers.authorization } });
    const accounts = await User.findAll({ where: { name: user.name } });
    const commissions = await Commission.findOne({ where: { companyEmail: user.companyEmail } });
    // console.log("this is the leverage and commition,", user.leverage)
    return res.status(200).json({ commissions: commissions, accounts: accounts });
}


exports.getAllPermissions = async (req, res) => {
    return res.status(200).json({ permissions: permission.paths });
}

exports.getPermissions = async (req, res) => {
   const user = req.user;
    const permissions = await UserPermission.findAll({ where: { user_id: user.id } });
    return res.status(200).json({ permissions: permissions });
}

exports.createPermission = async (req, res) => {
    const { path } = req.body
   const user = req.user;
    if (!permission.paths.includes(path)) {
        return res.status(200).json({ state: "path fail" });
    }
    const userPermission = await UserPermission.findOne({ where: { path: path } });
    if (!userPermission) {
        await UserPermission.create({ user_id: user.id, path: path });
        return res.status(200).json({ state: "success" });
    }
    return res.status(200).json({ state: "fail" });
}

exports.deletePermission = async (req, res) => {
    const { path } = req.body
    const user = req.user;
    const userPermission = await UserPermission.findOne({ where: { path: path } });
    if (userPermission) {
        await UserPermission.destroy({ where: { id: userPermission.id } });
        return res.status(200).json({ state: "success" });
    }
    return res.status(200).json({ state: "fail" });
}