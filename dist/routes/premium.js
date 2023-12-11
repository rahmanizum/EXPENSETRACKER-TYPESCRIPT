"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const premium_1 = __importDefault(require("../controllers/premium"));
const authetication_1 = __importDefault(require("../middleware/authetication"));
const router = (0, express_1.Router)();
router.get('/leaderborddata', authetication_1.default.authorization, premium_1.default.getLeaderboardExpenses);
router.get('/download', authetication_1.default.authorization, premium_1.default.getDownloadURL);
router.get('/downloadhistory', authetication_1.default.authorization, premium_1.default.getDownloadHistory);
exports.default = router;
