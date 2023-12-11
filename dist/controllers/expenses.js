"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
const expenses_1 = __importDefault(require("../models/expenses"));
const addExpenses = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield database_1.default.transaction();
        const user = request.user;
        const { category, pmethod, amount, date } = request.body;
        yield user.createExpense({
            category: category,
            pmethod: pmethod,
            amount: amount,
            date: date
        }, { transaction });
        const totalExpenses = yield expenses_1.default.sum('amount', { where: { UserId: user.id }, transaction });
        yield user.update({ totalexpenses: totalExpenses }, { transaction });
        yield transaction.commit();
        response.status(200).json({ message: 'Data successfully added' });
    }
    catch (error) {
        console.log(error);
        if (transaction) {
            yield transaction.rollback();
        }
        response.status(500).json({ message: 'An error occurred' });
    }
});
const getExpenses = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(request.query.page);
        const user = request.user;
        const limit = Number(request.query.noitem);
        const offset = (page - 1) * 5;
        const expenses = yield user.getExpenses({
            offset: offset,
            limit: limit
        });
        response.status(200).json({
            expenses: expenses,
            totalexpenses: user.totalexpenses,
            hasMoreExpenses: expenses.length === limit,
            hasPreviousExpenses: page > 1
        });
    }
    catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
});
const deleteById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield database_1.default.transaction();
        const dID = request.params.dID;
        const user = request.user;
        const result = yield expenses_1.default.destroy({ where: { id: dID, userId: user.id }, transaction });
        const totalExpenses = yield expenses_1.default.sum('amount', { where: { UserId: user.id }, transaction });
        if (totalExpenses) {
            yield user.update({ totalexpenses: totalExpenses }, { transaction });
        }
        else {
            yield user.update({ totalexpenses: 0 }, { transaction });
        }
        if (result == 0) {
            return response.status(401).json({ message: 'You are not Authorized' });
        }
        else {
            response.status(200).json({ message: 'Successfully deleted' });
        }
        yield transaction.commit();
    }
    catch (error) {
        if (transaction) {
            yield transaction.rollback();
        }
        console.log(error);
    }
});
const getExpensesById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.user;
        const eID = request.params.eID;
        const expense = yield user.getExpenses({ where: { id: eID } });
        response.status(200).json(expense);
    }
    catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
});
const updateExpenseById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        const uID = request.params.uID;
        const user = request.user;
        const { category, pmethod, amount, date } = request.body;
        const up = yield expenses_1.default.update({
            category: category,
            pmethod: pmethod,
            amount: amount,
            date: date
        }, { where: { id: uID } });
        const totalExpenses = yield expenses_1.default.sum('amount', { where: { UserId: user.id } });
        if (totalExpenses) {
            yield user.update({ totalexpenses: totalExpenses }, { transaction });
        }
        else {
            yield user.update({ totalexpenses: 0 }, { transaction });
        }
        response.status(200).json({ message: 'Data successfully updated' });
        transaction.commit();
    }
    catch (error) {
        if (transaction) {
            yield transaction.rollback();
        }
        console.log(error);
    }
});
exports.default = {
    addExpenses,
    getExpenses,
    deleteById,
    getExpensesById,
    updateExpenseById,
};
