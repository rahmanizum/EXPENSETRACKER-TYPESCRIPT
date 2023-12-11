"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainpage_1 = __importDefault(require("../controllers/mainpage"));
const router = (0, express_1.Router)();
router.get('/home', mainpage_1.default.getHomePage);
router.get('', mainpage_1.default.getErrorPage);
exports.default = router;
