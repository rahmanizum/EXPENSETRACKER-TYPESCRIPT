"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_1 = __importDefault(require("../controllers/password"));
const router = (0, express_1.Router)();
router.get('/reset/:id', password_1.default.resetPasswordForm);
router.post('/reset', password_1.default.resetPassword);
router.post('/forgotpassword', password_1.default.requestResetPassword);
exports.default = router;
