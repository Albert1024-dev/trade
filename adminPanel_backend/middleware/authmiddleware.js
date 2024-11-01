const { User } = require("../models");
const { UserPermission } = require("../models");
const permission = require("../config/permission");

exports.authmiddleware = async (req, res, next) => {
    // check token validation
    const token = req.headers.authorization || "";
    if (token == "") {
        res.status(401).json({ state: "No Valid Token! Please Login Again!" });
        return
    }

    // check user validation
    const user = await User.findOne({ where: { token } });
    if (!user) {
        res.status(401).json({ state: "No Valid Token! Please Login Again!" });
        return
    }

    req.user = user;
    // check api permission validation
    const path = req.route.path;
    if (!permission.default.includes(path)) {
        const permission = await UserPermission.findOne({ where: { user_id: user.id, path: path } });
        if (!permission) {
            res.status(401).json({ state: "No Valid Path! Please Ask Access Permission!" });
            return
        }
    }

    next();
}
