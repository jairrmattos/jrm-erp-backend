import pool from '../config/db.js';
export const registrarPagamento = async (req,res) => {
  try {
    const b = req.body;
    const r = await pool.query(
      `INSERT INTO pagamentos (company_id, referencia_tipo, referencia_id, tipo_pagamento, metodo, conta_bancaria_id, titular_recebeu, banco_recebeu, data_pagamento, valor, tx_id, observacao, criado_por)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [b.company_id, b.referencia_tipo, b.referencia_id, b.tipo_pagamento, b.metodo, b.conta_bancaria_id, b.titular_recebeu, b.banco_recebeu, b.data_pagamento, b.valor, b.tx_id, b.observacao, req.user?.id || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const listarPagamentos = async (req,res) => {
  try {
    const { companyId } = req.query;
    const q = await pool.query('SELECT * FROM pagamentos WHERE company_id=$1 ORDER BY data_pagamento DESC LIMIT 200',[companyId]);
    res.json(q.rows);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const resumoPorReferencia = async (req,res) => {
  try {
    const { companyId, referencia_tipo, referencia_id } = req.query;
    const q = await pool.query('SELECT COALESCE(SUM(valor),0) as recebido FROM pagamentos WHERE company_id=$1 AND referencia_type=$2 AND referencia_id=$3',[companyId, referencia_tipo, referencia_id]);
    res.json({recebido: q.rows[0].recebido});
  } catch (err) { res.status(500).json({error:err.message}); }
};
