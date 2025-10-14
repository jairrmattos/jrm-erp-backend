import express from 'express';
import { getKPIs, getFreteMensal, getComparativoFretes, exportCsv } from '../controllers/reportController.js';
const router = express.Router();
router.get('/kpis', getKPIs);
router.get('/frete-mensal', getFreteMensal);
router.get('/comparativo-fretes', getComparativoFretes);
router.get('/export/:view', exportCsv);
export default router;
