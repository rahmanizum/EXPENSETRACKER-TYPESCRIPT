import { Router } from 'express';
import mainpageController from '../controllers/mainpage';

const router: Router = Router();

router.get('/home', mainpageController.getHomePage);
router.get('', mainpageController.getErrorPage);

export default router;
