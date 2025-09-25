import {Router} from 'express'
import { adminLogin, coordinatorLogin, logout, getCurrUser, registerStudnet, studentLogin} from '../controllers/auth.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/admin/login').post(adminLogin);
router.route('/coordinator/login').post(coordinatorLogin);
router.route('/logout').post(verifyJWT, logout);
router.route('/get-curr-user').get(verifyJWT, getCurrUser);
router.route("/register").post(registerStudnet);
router.route('/student/login').post(studentLogin);

export default router;