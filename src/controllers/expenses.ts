import { Request, Response, NextFunction } from 'express';
import { Transaction } from 'sequelize';
import sequelize from '../util/database';
import Expenses from '../models/expenses';

interface CustomRequest extends Request {
    user:object,
    headers:any,
    body:any,
    query:any
    params:any
}

const addExpenses = async (request: CustomRequest, response: Response, next: NextFunction) => {
    let transaction: Transaction | undefined;
    try {
        transaction = await sequelize.transaction();

        const user = request.user as any;
        const { category, pmethod, amount, date } = request.body;

        await user.createExpense({
            category: category,
            pmethod: pmethod,
            amount: amount,
            date: date
        }, { transaction });

        const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id }, transaction });
        await user.update({ totalexpenses: totalExpenses }, { transaction });

        await transaction.commit();
        response.status(200).json({ message: 'Data successfully added' });

    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        response.status(500).json({ message: 'An error occurred' });
    }
};

const getExpenses = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const page = Number(request.query.page as string) ;
        const user = request.user as any;
        const limit = Number(request.query.noitem);
        const offset = (page - 1) * 5;
        const expenses = await user.getExpenses({
            offset: offset,
            limit: limit
        });
        response.status(200).json({
            expenses: expenses,
            totalexpenses: user.totalexpenses,
            hasMoreExpenses: expenses.length === limit,
            hasPreviousExpenses: page > 1
        });

    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
};

const deleteById = async (request: CustomRequest, response: Response, next: NextFunction) => {
    let transaction: Transaction | undefined;
    try {
        transaction = await sequelize.transaction();
        const dID = request.params.dID as String;
        const user = request.user as any;
        const result = await Expenses.destroy({ where: { id: dID, userId: user.id }, transaction });
        const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id }, transaction });

        if (totalExpenses) {
            await user.update({ totalexpenses: totalExpenses }, { transaction });
        } else {
            await user.update({ totalexpenses: 0 }, { transaction });
        }

        if (result == 0) {
            return response.status(401).json({ message: 'You are not Authorized' });
        } else {
            response.status(200).json({ message: 'Successfully deleted' });
        }

        await transaction.commit();
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
    }
};

const getExpensesById = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const user = request.user as any;
        const eID = request.params.eID as number;
        const expense = await user.getExpenses({ where: { id: eID } });
        response.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
};

const updateExpenseById = async (request: CustomRequest, response: Response, next: NextFunction) => {
    let transaction: Transaction | undefined;
    try {
        const uID = request.params.uID as String;
        const user = request.user as any;
        const { category, pmethod, amount, date } = request.body;

        const up = await Expenses.update(
            {
                category: category,
                pmethod: pmethod,
                amount: amount,
                date: date
            },
            { where: { id: uID } }
        );

        const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id } });

        if (totalExpenses) {
            await user.update({ totalexpenses: totalExpenses }, { transaction });
        } else {
            await user.update({ totalexpenses: 0 }, { transaction });
        }

        response.status(200).json({ message: 'Data successfully updated' });
        transaction.commit();
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
    }
};

export default {
    addExpenses,
    getExpenses,
    deleteById,
    getExpensesById,
    updateExpenseById,
};