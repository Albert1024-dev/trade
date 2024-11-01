const express = require('express');
const router = express.Router();
const tradeControl = require("../control/tradeController")
const authControl = require("../control/authController");
const { authmiddleware } = require('../middleware/authmiddleware');
const adminControl = require('../control/adminController');
 
const app = express();

router.post("/login", authControl.login);

router.get("/getAllPermissions", authmiddleware, tradeControl.getAllPermissions);
router.get("/getPermissions", authmiddleware, tradeControl.getPermissions);
router.post("/createPermission", authmiddleware, tradeControl.createPermission);
router.post("/deletePermission", authmiddleware, tradeControl.deletePermission);

router.post("/createPosition", authmiddleware, tradeControl.createPosition);
router.post("/cancelPosition", authmiddleware, tradeControl.closePosition);
router.post("/getAllPositions", authmiddleware, tradeControl.getAllPosition);
router.post("/updatePosition", authmiddleware, tradeControl.updatePosition);
router.get("/getSymbols", authmiddleware, tradeControl.getSymbols);
router.get("/getTradingDatas", authmiddleware, tradeControl.getTradingDatas);

router.post("/create-user", adminControl.createUserOfCompany);

module.exports = router;