import express from 'express';
import { criarCotacaoFrete, converterCotacaoParaManifesto } from '../controllers/freteCotacaoController.js';
const router = express.Router();
router.post('/', criarCotacaoFrete);
router.post('/:id/convert', converterCotacaoParaManifesto);
router.get('/', async (req,res) => {
  const pool = (await import('../config/db.js')).default;
  const q = await pool.query('SELECT * FROM frete_cotacoes ORDER BY created_at DESC LIMIT 200');
  res.json(q.rows);
});
export default router;
