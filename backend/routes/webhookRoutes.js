import express from 'express';
import { webhookPix } from '../controllers/webhookPixController.js';
const router = express.Router();
router.post('/pix', webhookPix);
export default router;
