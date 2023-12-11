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
const orders_1 = __importDefault(require("../models/orders"));
const razorpay_1 = __importDefault(require("razorpay"));
const key_id = process.env.RAZORPAY_KEY_ID || '';
const key_secret = process.env.RAZORPAY_KEY_SECRET || '';
const premiumMembership = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rzpInstance = new razorpay_1.default({
            key_id: key_id,
            key_secret: key_secret
        });
        const options = {
            amount: 50000,
            currency: "INR",
        };
        const orderDetails = yield rzpInstance.orders.create(options);
        const user = request.user;
        const { id, status } = orderDetails;
        yield user.createOrder({
            orderid: id,
            status: status,
        });
        response.status(200).json({ key_id: key_id, orderid: id, user: user });
    }
    catch (error) {
        console.log(error);
    }
});
const updateTransactionStatus = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, payment_id } = request.body;
    try {
        const user = request.user;
        user.ispremiumuser = true;
        yield Promise.all([
            user.save(),
            orders_1.default.update({ paymentid: payment_id, status: "Successful" }, { where: { orderid: order_id } })
        ]);
        response.status(202).json({ success: true, message: "Thank you for being a premium user" });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error updating transaction" });
    }
});
exports.default = {
    premiumMembership,
    updateTransactionStatus,
};
