import pool from '../config/db.js';
export const webhookPix = async (req,res) => {
  try {
    const { tx_id, valor, data_pagamento, chave_pix, manifesto_id } = req.body;
    const conta = await pool.query('SELECT * FROM contas_bancarias WHERE pix_chave=$1',[chave_pix]);
    if (!conta.rows.length) return res.status(404).json({error:'Conta PIX não encontrada'});
    const existing = await pool.query('SELECT * FROM pagamentos WHERE tx_id=$1',[tx_id]);
    if (existing.rows.length) {
      await pool.query('UPDATE pagamentos SET data_pagamento=$1, valor=$2 WHERE tx_id=$3',[data_pagamento, valor, tx_id]);
    } else {
      await pool.query(`INSERT INTO pagamentos (company_id, referencia_tipo, referencia_id, tipo_pagamento, metodo, conta_bancaria_id, titular_recebeu, banco_recebeu, data_pagamento, valor, tx_id, observacao, criado_por)
        VALUES ($1,'manifesto',$2,'adiantamento','PIX',$3,$4,$5,$6,$7,$8,'PIX recebido via webhook',NULL)`,
        [conta.rows[0].company_id, manifesto_id || 0, conta.rows[0].id, conta.rows[0].titular, conta.rows[0].banco, data_pagamento, valor, tx_id]);
    }
    res.json({success:true});
  } catch (err) { res.status(500).json({error:err.message}); }
};
