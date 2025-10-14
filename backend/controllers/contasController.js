import pool from '../config/db.js';
export const criarConta = async (req,res) => {
  try {
    const b = req.body;
    const r = await pool.query(
      `INSERT INTO contas_bancarias (company_id,titular,banco,agencia,conta,tipo_conta,pix_chave,descricao,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [b.company_id,b.titular,b.banco,b.agencia,b.conta,b.tipo_conta,b.pix_chave,b.descricao, req.user?.id || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const listarContas = async (req,res) => {
  try {
    const { companyId } = req.query;
    const q = await pool.query('SELECT * FROM contas_bancarias WHERE company_id=$1 AND ativo=true',[companyId]);
    res.json(q.rows);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const atualizarConta = async (req,res) => {
  try {
    const { id } = req.params;
    const b = req.body;
    const q = await pool.query('UPDATE contas_bancarias SET titular=$1,banco=$2,agencia=$3,conta=$4,tipo_conta=$5,pix_chave=$6,descricao=$7 WHERE id=$8 RETURNING *',[b.titular,b.banco,b.agencia,b.conta,b.tipo_conta,b.pix_chave,b.descricao,id]);
    res.json(q.rows[0]);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const desativarConta = async (req,res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE contas_bancarias SET ativo=false WHERE id=$1',[id]);
    res.json({success:true});
  } catch (err) { res.status(500).json({error:err.message}); }
};
