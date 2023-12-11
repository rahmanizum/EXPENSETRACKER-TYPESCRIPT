import { Request, Response, NextFunction } from 'express';
import Userservices from '../services/userservices';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface CustomRequest extends Request {
    user:object,
    headers:any,
    body:any,
    query:any
    params:any
}
const secretKey: string = process.env.SECRET_KEY || '';

const userGetHomePage = (request: Request, response: Response, next: NextFunction) => {
    response.sendFile('main.html', { root: 'views' });
};

const signupAuthentication = async (request: Request, response: Response, next: NextFunction) => {
    const { Name, userName, password } = request.body;

    try {
        const user = await Userservices.getUserbyemail(userName);
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Userservices.createUser(Name, userName, hashedPassword);
            const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });
            response.status(200).send({ token: token, user: newUser });
        } else {
            response.status(401).send(user);
        }
    } catch (error) {
        console.log(error);
    }
};

const signinAuthentication = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userName, password } = request.body;
        const user = await Userservices.getUserbyemail(userName);

        if (!user) {
            response.status(404).send('User not found');
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
                response.status(200).json({ token: token, user: user });
            } else {
                response.status(401).send('Authentication failed');
            }
        }
    } catch (error) {
        console.log(error);
        response.status(500).send('An error occurred during authentication');
    }
};

const getCurrentUser = async (request: CustomRequest , response: Response, next: NextFunction) => {
    const user = request.user as any;
    response.json({ user });
};

export default{
    userGetHomePage,
    signupAuthentication,
    signinAuthentication,
    getCurrentUser
}
