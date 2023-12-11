"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenses_1 = __importDefault(require("../controllers/expenses"));
const authetication_1 = __importDefault(require("../middleware/authetication"));
const router = (0, express_1.Router)();
router.post('/addexpense', authetication_1.default.authorization, expenses_1.default.addExpenses);
router.get('/getexpenses', authetication_1.default.authorization, expenses_1.default.getExpenses);
router.get('/getexpensebyid/:eID', authetication_1.default.authorization, expenses_1.default.getExpensesById);
router.delete('/delete/:dID', authetication_1.default.authorization, expenses_1.default.deleteById);
router.put('/update/:uID', authetication_1.default.authorization, expenses_1.default.updateExpenseById);
exports.default = router;
