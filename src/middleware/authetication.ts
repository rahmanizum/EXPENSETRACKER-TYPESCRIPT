import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users';

// custom.d.ts (or any .d.ts file of your choice)
interface CustomRequest extends Request {
    user:object,
    headers:any,
    body:any,
    query:any
    params:any
}

  

const secretKey: string = process.env.SECRET_KEY || '';

const authorization = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const token: string | undefined = request.headers.authorization;
        if (!token) {
            response.status(401).json({ message: 'Unauthorized - please sign in' });
            return;
        }

        const decode: any = jwt.verify(token, secretKey);
        if (!decode || !decode.userId) {
            response.status(401).json({ message: 'Invalid token' });
            return;
        }

        const user = await User.findByPk(decode.userId);
        
        if (!user) {
            response.status(401).json({ message: 'User not found' });
            return;
        }

        request.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            response.status(401).json({ message: 'Time out, please sign in' });
        } else {
            console.log('Error:', error);
            response.status(500).json({ message: 'Internal Server Error - please login again' });
        }
    }
};

export default {authorization};
