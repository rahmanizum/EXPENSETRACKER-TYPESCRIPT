import { Router } from 'express';
import premiumController from '../controllers/premium';
import authController from '../middleware/authetication';

const router: Router = Router();

router.get('/leaderborddata', authController.authorization, premiumController.getLeaderboardExpenses);
router.get('/download', authController.authorization, premiumController.getDownloadURL);
router.get('/downloadhistory', authController.authorization, premiumController.getDownloadHistory);

export default router;
