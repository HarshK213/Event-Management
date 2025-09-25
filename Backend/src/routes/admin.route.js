import {Router} from 'express'
import {verifyJWT} from '../middleware/auth.middleware.js'
import {upload} from '../middleware/multer.middleware.js'
import { verifyRoles } from '../middleware/roles.middleware.js'
import { createEvent,listEvent,exportEventsExcel } from '../controllers/admin.controller.js'

const router = Router();

router.route("/create-event").post(verifyJWT,verifyRoles('admin'),createEvent)
router.route("/events").get(verifyJWT,verifyRoles('admin'),listEvent)
router.route("/event/:id/export").get(verifyJWT,verifyRoles('admin'),exportEventsExcel);

export default router;