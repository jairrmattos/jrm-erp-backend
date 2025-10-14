import express from 'express';
import { registrarPagamento, listarPagamentos, resumoPorReferencia } from '../controllers/financeiroController.js';
const router = express.Router();
router.post('/', registrarPagamento);
router.get('/', listarPagamentos);
router.get('/resumo', resumoPorReferencia);
export default router;
