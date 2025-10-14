import pool from '../config/db.js';
export const gerarCodigoSequencial = async (tabela, prefixo) => {
  const r = await pool.query(`SELECT COUNT(*) + 1 AS total FROM ${tabela}`);
  const numero = String(r.rows[0].total).padStart(4,'0');
  return `${prefixo}${numero}`;
};
