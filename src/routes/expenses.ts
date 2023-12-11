import { Router } from 'express';
import expenseController from '../controllers/expenses';
import authController from '../middleware/authetication';

const router: Router = Router();

router.post('/addexpense', authController.authorization, expenseController.addExpenses);
router.get('/getexpenses', authController.authorization, expenseController.getExpenses);
router.get('/getexpensebyid/:eID', authController.authorization, expenseController.getExpensesById);
router.delete('/delete/:dID', authController.authorization, expenseController.deleteById);
router.put('/update/:uID', authController.authorization, expenseController.updateExpenseById);

export default router;
