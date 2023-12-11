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
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.create({
            name,
            email,
            password,
        });
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUserbyemail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield users_1.default.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createUser,
    getUserbyemail,
};
