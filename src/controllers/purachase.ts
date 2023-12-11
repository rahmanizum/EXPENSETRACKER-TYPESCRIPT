import { Request, Response, NextFunction } from 'express';
import Order from '../models/orders';
import Razorpay from 'razorpay';
const key_id: string = process.env.RAZORPAY_KEY_ID || '';
const key_secret: string = process.env.RAZORPAY_KEY_SECRET || '';

interface CustomRequest extends Request {
    user:object,
    headers:any,
    body:any,
    query:any
    params:any
}

const premiumMembership = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const rzpInstance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret
        });

        const options = {
            amount: 50000,
            currency: "INR",
        };

        const orderDetails = await rzpInstance.orders.create(options);
        const user = request.user as any;
        const { id, status } = orderDetails;

        await user.createOrder({
            orderid: id,
            status: status,
        });

        response.status(200).json({ key_id: key_id, orderid: id, user: user });
    } catch (error) {
        console.log(error);
    }
};

const updateTransactionStatus = async (request: CustomRequest, response: Response, next: NextFunction) => {
    const { order_id, payment_id } = request.body;

    try {
        const user = request.user as any;
        user.ispremiumuser = true;

        await Promise.all([
            user.save(),
            Order.update(
                { paymentid: payment_id, status: "Successful" },
                { where: { orderid: order_id } }
            )
        ]);

        response.status(202).json({ success: true, message: "Thank you for being a premium user" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error updating transaction" });
    }
};

export default {
    premiumMembership,
    updateTransactionStatus,
}
