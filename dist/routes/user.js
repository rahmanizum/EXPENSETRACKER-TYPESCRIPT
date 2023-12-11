"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const authetication_1 = __importDefault(require("../middleware/authetication"));
const router = (0, express_1.Router)();
router.post('/signup', user_1.default.signupAuthentication);
router.post('/signin', user_1.default.signinAuthentication);
router.get('/currentuser', authetication_1.default.authorization, user_1.default.getCurrentUser);
router.get('', user_1.default.userGetHomePage);
exports.default = router;
