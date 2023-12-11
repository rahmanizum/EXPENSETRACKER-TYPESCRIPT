import { Router } from 'express';
import passwordController from '../controllers/password';

const router: Router = Router();

router.get('/reset/:id', passwordController.resetPasswordForm);
router.post('/reset', passwordController.resetPassword);
router.post('/forgotpassword', passwordController.requestResetPassword);

export default router;
