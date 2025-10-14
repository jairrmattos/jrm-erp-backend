import pool from '../config/db.js';
import { Parser } from 'json2csv';
export const getKPIs = async (req,res) => {
  try {
    const { companyId } = req.query;
    const q = await pool.query('SELECT * FROM vw_kpis_empresa WHERE company_id=$1',[companyId]);
    res.json(q.rows[0] || {});
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const getFreteMensal = async (req,res) => {
  try {
    const q = await pool.query('SELECT * FROM vw_frete_mensal ORDER BY ano_mes ASC');
    res.json(q.rows);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const getComparativoFretes = async (req,res) => {
  try {
    const { companyId, limit = 100 } = req.query;
    const q = await pool.query('SELECT * FROM vw_comparativo_fretes LIMIT $1',[limit]);
    res.json(q.rows);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const exportCsv = async (req,res) => {
  try {
    const { view } = req.params;
    let sql = 'SELECT * FROM vw_comparativo_fretes';
    if (view === 'top-rotas') sql = 'SELECT * FROM vw_top_rotas';
    const q = await pool.query(sql);
    const parser = new Parser();
    const csv = parser.parse(q.rows);
    res.header('Content-Type','text/csv');
    res.attachment(`${view}.csv`);
    res.send(csv);
  } catch (err) { res.status(500).json({error:err.message}); }
};
