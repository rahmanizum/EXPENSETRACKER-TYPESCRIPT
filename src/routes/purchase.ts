import { Router } from 'express';
import purchaseController from '../controllers/purachase';
import authController from '../middleware/authetication';

const router: Router = Router();

router.get('/premiummembership', authController.authorization, purchaseController.premiumMembership);
router.put('/updatetransactionstatus', authController.authorization, purchaseController.updateTransactionStatus);

export default router;
