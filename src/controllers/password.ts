import { Request, Response, NextFunction } from 'express';
const{ TransactionalEmailsApi } = require('sib-api-v3-sdk');
import bcrypt from 'bcrypt';
import User from '../models/users';
import ForgotPasswords from '../models/forgotpasswords';

interface userInterface {
    createForgotpassword:Function
}


const tranEmailApi = new TransactionalEmailsApi();
const resetPasswordForm = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let id = request.params.id;
        const passwordReset = await ForgotPasswords.findByPk(id);
        if (passwordReset && passwordReset.isactive) {
            passwordReset.isactive = false;
            await passwordReset.save();
            response.sendFile('resetpassword.html', { root: 'views' });
        } else {
            return response.status(401).json({ message: "Link has been expired" });
        }
    } catch (error) {
        console.error("Error resetting password:", error);
    }
};

const requestResetPassword = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email } = request.body;
        const user :userInterface  = await User.findOne({
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
            const resetResponse = await user.createForgotpassword({});
            const { id } = resetResponse;

            const mailResponse = await tranEmailApi.sendTransacEmail({
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
        } else {
            response.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};
const resetPassword = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { resetid, newpassword } = request.body;
        const passwordReset = await ForgotPasswords.findByPk(resetid);
        const currentTime = new Date();
        const createdAtTime = new Date(passwordReset.createdAt);
        const timeDifference = currentTime.getTime() - createdAtTime.getTime();
        const timeLimit = 5 * 60 * 1000;

        if (timeDifference <= timeLimit) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            await User.update(
                {
                    password: hashedPassword
                },
                {
                    where: { id: passwordReset.UserId }
                }
            );
            response.status(200).json({ message: "Password reset successful." });
        } else {
            response.status(403).json({ message: "Link has expired" });
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

export default{
    resetPasswordForm,
    requestResetPassword,
    resetPassword
}
