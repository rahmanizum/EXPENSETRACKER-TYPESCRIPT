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
const users_1 = __importDefault(require("../models/users"));
const awsservices_1 = __importDefault(require("../services/awsservices"));
const getLeaderboardExpenses = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaderboard = yield users_1.default.findAll({
            attributes: ['id', 'name', 'totalExpenses'],
            order: [['totalExpenses', 'DESC']],
            limit: 15,
        });
        return response.status(200).json(leaderboard);
    }
    catch (error) {
        console.error(error);
        return response.status(401).json({ message: 'Unauthorized - please relogin' });
    }
});
const getDownloadURL = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.user;
        const expenses = yield user.getExpenses({
            attributes: ["category", "pmethod", "amount", "date"],
        });
        const formattedExpenses = expenses.map(expense => {
            return `Category: ${expense.category}
Payment Method: ${expense.pmethod}
Amount: ${expense.amount}
Date: ${expense.date}
`;
        });
        const textData = formattedExpenses.join("\n");
        const filename = `expense-data/user${user.id}/${user.name}${new Date()}.txt`;
        const URL = yield awsservices_1.default.uploadToS3(textData, filename);
        yield user.createDownload({
            downloadUrl: URL
        });
        response.status(200).json({ URL, success: true });
    }
    catch (error) {
        console.log("Error while creating download link: " + error);
        response.status(500).json({ message: "Unable to generate URL" });
    }
});
const getDownloadHistory = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.user;
        const history = yield user.getDownloads();
        response.status(200).json(history);
    }
    catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unable to fetch history' });
    }
});
exports.default = {
    getLeaderboardExpenses,
    getDownloadURL,
    getDownloadHistory
};
