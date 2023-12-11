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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const secretKey = process.env.SECRET_KEY || '';
const authorization = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.headers.authorization;
        if (!token) {
            response.status(401).json({ message: 'Unauthorized - please sign in' });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decode || !decode.userId) {
            response.status(401).json({ message: 'Invalid token' });
            return;
        }
        const user = yield users_1.default.findByPk(decode.userId);
        if (!user) {
            response.status(401).json({ message: 'User not found' });
            return;
        }
        request.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            response.status(401).json({ message: 'Time out, please sign in' });
        }
        else {
            console.log('Error:', error);
            response.status(500).json({ message: 'Internal Server Error - please login again' });
        }
    }
});
exports.default = { authorization };
