import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
console.log(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD )
const PORT: number | string = process.env.PORT || 3000;

import sequelize from './util/database';
import Expenses from './models/expenses';
import User from './models/users';
import Orders from './models/orders';
import Forgotpasswords from './models/forgotpasswords';
import Downloads from './models/downloads';

import mainPageRouter from './routes/mainpage';
import userRouter from './routes/user';
import expenseRouter from './routes/expenses';
import purchaseRouter from './routes/purchase';
import premiumRouter from './routes/premium';
import passwordRouter from './routes/password';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

User.hasMany(Expenses);
Expenses.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Orders);
Orders.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Forgotpasswords);
Forgotpasswords.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Downloads);
Downloads.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

app.use(mainPageRouter);
app.use('/user', userRouter);
app.use('/purchase', purchaseRouter);
app.use('/expenses', expenseRouter);
app.use('/premium', premiumRouter);
app.use('/password', passwordRouter);

async function initiate() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

initiate();
