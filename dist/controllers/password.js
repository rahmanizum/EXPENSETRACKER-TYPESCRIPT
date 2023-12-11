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
const { TransactionalEmailsApi } = require('sib-api-v3-sdk');
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const forgotpasswords_1 = __importDefault(require("../models/forgotpasswords"));
const tranEmailApi = new TransactionalEmailsApi();
const resetPasswordForm = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = request.params.id;
        const passwordReset = yield forgotpasswords_1.default.findByPk(id);
        if (passwordReset && passwordReset.isactive) {
            passwordReset.isactive = false;
            yield passwordReset.save();
            response.sendFile('resetpassword.html', { root: 'views' });
        }
        else {
            return response.status(401).json({ message: "Link has been expired" });
        }
    }
    catch (error) {
        console.error("Error resetting password:", error);
    }
});
const requestResetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const user = yield users_1.default.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const sender = {
                email: 'ramanizum@gmail.com',
                name: 'From Mufil Rahman Pvt.Ltd'
            };
            const receivers = [
                {
                    email: email
                }
            ];
            const resetResponse = yield user.createForgotpassword({});
            const { id } = resetResponse;
            const mailResponse = yield tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: "Reset Your password",
                htmlContent: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body>
                    <h1>Reset Your Password</h1>
                    <p>Click the button below to reset your password:</p>
                    <button><a href="${process.env.WEBSITE}/password/reset/${id}">Reset Password</a></button>
                </body>
                </html>`,
                params: {
                    role: id
                }
            });
            response.status(200).json({ message: 'Password reset email sent' });
        }
        else {
            response.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error("Error resetting password:", error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});
const resetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resetid, newpassword } = request.body;
        const passwordReset = yield forgotpasswords_1.default.findByPk(resetid);
        const currentTime = new Date();
        const createdAtTime = new Date(passwordReset.createdAt);
        const timeDifference = currentTime.getTime() - createdAtTime.getTime();
        const timeLimit = 5 * 60 * 1000;
        if (timeDifference <= timeLimit) {
            const hashedPassword = yield bcrypt_1.default.hash(newpassword, 10);
            yield users_1.default.update({
                password: hashedPassword
            }, {
                where: { id: passwordReset.UserId }
            });
            response.status(200).json({ message: "Password reset successful." });
        }
        else {
            response.status(403).json({ message: "Link has expired" });
        }
    }
    catch (error) {
        console.error("Error resetting password:", error);
        response.status(500).json({ message: "Internal server error" });
    }
});
exports.default = {
    resetPasswordForm,
    requestResetPassword,
    resetPassword
};
