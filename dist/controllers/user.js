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
const userservices_1 = __importDefault(require("../services/userservices"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY || '';
const userGetHomePage = (request, response, next) => {
    response.sendFile('main.html', { root: 'views' });
};
const signupAuthentication = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, userName, password } = request.body;
    try {
        const user = yield userservices_1.default.getUserbyemail(userName);
        if (!user) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield userservices_1.default.createUser(Name, userName, hashedPassword);
            const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });
            response.status(200).send({ token: token, user: newUser });
        }
        else {
            response.status(401).send(user);
        }
    }
    catch (error) {
        console.log(error);
    }
});
const signinAuthentication = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = request.body;
        const user = yield userservices_1.default.getUserbyemail(userName);
        if (!user) {
            response.status(404).send('User not found');
        }
        else {
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (isPasswordValid) {
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
                response.status(200).json({ token: token, user: user });
            }
            else {
                response.status(401).send('Authentication failed');
            }
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send('An error occurred during authentication');
    }
});
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    response.json({ user });
});
exports.default = {
    userGetHomePage,
    signupAuthentication,
    signinAuthentication,
    getCurrentUser
};
