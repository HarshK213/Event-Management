import {Router} from 'express'
import {verifyJWT} from '../middleware/auth.middleware.js'
import {verifyRoles} from '../middleware/roles.middleware.js'
import { getMyEvents, listUpcoming, register, viewEvent } from '../controllers/student.controller.js'

const router = Router();

router.route("/events").get(listUpcoming);
router.route("/event/:id").get(viewEvent);
router.route("/register/:id").post(verifyJWT, verifyRoles('student'),register);
router.route("/events/get-my-events").get(verifyJWT, verifyRoles('student'), getMyEvents);

export default router;