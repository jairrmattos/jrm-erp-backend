import pool from '../config/db.js';
export const listManifestos = async (req,res) => {
  try {
    const q = await pool.query('SELECT * FROM manifestos ORDER BY created_at DESC LIMIT 200');
    res.json(q.rows);
  } catch (err) { res.status(500).json({error:err.message}); }
};
export const updateStatus = async (req,res) => {
  try {
    const { id } = req.params;
    const { status, localizacao_atual, data_chegada } = req.body;
    const r = await pool.query(
      `UPDATE manifestos SET status=$1, localizacao_atual=$2, data_chegada=CASE WHEN $1='Entregue' THEN $3 ELSE data_chegada END WHERE id=$4 RETURNING *`,
      [status, localizacao_atual, data_chegada, id]
    );
    if (!r.rows.length) return res.status(404).json({error:'Manifesto não encontrado'});
    // update isca
    const mf = r.rows[0];
    if (mf.isca_id) {
      let novo = 'Disponível';
      if (status === 'Em Viagem') novo = 'Em Uso';
      else if (status === 'No Cliente') novo = 'No Cliente';
      else if (status === 'Entregue') novo = 'Disponível';
      await pool.query('UPDATE iscas_carga SET status=$1, ultima_atualizacao=NOW() WHERE id=$2',[novo,mf.isca_id]);
    }
    res.json(r.rows[0]);
  } catch (err) { res.status(500).json({error:err.message}); }
};
