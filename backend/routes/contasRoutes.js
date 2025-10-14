import express from 'express';
import { criarConta, listarContas, atualizarConta, desativarConta } from '../controllers/contasController.js';
const router = express.Router();
router.post('/', criarConta);
router.get('/', listarContas);
router.put('/:id', atualizarConta);
router.delete('/:id', desativarConta);
export default router;
