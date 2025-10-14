import express from 'express';
import { listManifestos, updateStatus } from '../controllers/manifestoController.js';
const router = express.Router();
router.get('/', listManifestos);
router.patch('/:id/status', updateStatus);
export default router;
