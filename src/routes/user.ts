import { Router } from 'express';
import userController from '../controllers/user';
import authController from '../middleware/authetication';

const router: Router = Router();

router.post('/signup', userController.signupAuthentication);
router.post('/signin', userController.signinAuthentication);
router.get('/currentuser', authController.authorization, userController.getCurrentUser);
router.get('', userController.userGetHomePage);

export default router;
