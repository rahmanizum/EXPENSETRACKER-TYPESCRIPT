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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD);
const PORT = process.env.PORT || 3000;
const database_1 = __importDefault(require("./util/database"));
const expenses_1 = __importDefault(require("./models/expenses"));
const users_1 = __importDefault(require("./models/users"));
const orders_1 = __importDefault(require("./models/orders"));
const forgotpasswords_1 = __importDefault(require("./models/forgotpasswords"));
const downloads_1 = __importDefault(require("./models/downloads"));
const mainpage_1 = __importDefault(require("./routes/mainpage"));
const user_1 = __importDefault(require("./routes/user"));
const expenses_2 = __importDefault(require("./routes/expenses"));
const purchase_1 = __importDefault(require("./routes/purchase"));
const premium_1 = __importDefault(require("./routes/premium"));
const password_1 = __importDefault(require("./routes/password"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
users_1.default.hasMany(expenses_1.default);
expenses_1.default.belongsTo(users_1.default, { constraints: true, onDelete: 'CASCADE' });
users_1.default.hasMany(orders_1.default);
orders_1.default.belongsTo(users_1.default, { constraints: true, onDelete: 'CASCADE' });
users_1.default.hasMany(forgotpasswords_1.default);
forgotpasswords_1.default.belongsTo(users_1.default, { constraints: true, onDelete: 'CASCADE' });
users_1.default.hasMany(downloads_1.default);
downloads_1.default.belongsTo(users_1.default, { constraints: true, onDelete: 'CASCADE' });
app.use(mainpage_1.default);
app.use('/user', user_1.default);
app.use('/purchase', purchase_1.default);
app.use('/expenses', expenses_2.default);
app.use('/premium', premium_1.default);
app.use('/password', password_1.default);
function initiate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.sync();
            app.listen(PORT, () => {
                console.log(`Server is running at ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
initiate();
