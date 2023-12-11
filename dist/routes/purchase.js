"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purachase_1 = __importDefault(require("../controllers/purachase"));
const authetication_1 = __importDefault(require("../middleware/authetication"));
const router = (0, express_1.Router)();
router.get('/premiummembership', authetication_1.default.authorization, purachase_1.default.premiumMembership);
router.put('/updatetransactionstatus', authetication_1.default.authorization, purachase_1.default.updateTransactionStatus);
exports.default = router;
