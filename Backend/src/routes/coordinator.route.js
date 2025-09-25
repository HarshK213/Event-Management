import {Router} from 'express'
import {verifyJWT} from '../middleware/auth.middleware.js'
import { verifyRoles } from '../middleware/roles.middleware.js'
import { changeStatus, getRegistration } from '../controllers/coordinator.controller.js'

const router = Router();


router.route("/event/status/:id").patch(verifyJWT,verifyRoles('coordinator'),changeStatus)
router.route("/event/:id/registrations").put(verifyJWT,verifyRoles('coordinator'),getRegistration)

export default router;