import pool from '../config/db.js';
import { gerarCodigoSequencial } from '../utils/codigoSequencial.js';
import { calcularDistancia } from '../utils/rotasAPI.js';

export const criarCotacaoFrete = async (req, res) => {
  try {
    const body = req.body;
    const distancia = (body.origem_cep && body.destino_cep) ? await calcularDistancia(body.origem_cep, body.destino_cep) : 0;
    const peso = body.peso_manual || 0;
    const cubagem = body.cubagem_manual || 0;
    const valorKm = body.valor_km || 6.5;
    const valorM3 = body.valor_m3 || 700;
    const valor_total = Number((distancia * valorKm + cubagem * valorM3).toFixed(2));
    const codigo = await gerarCodigoSequencial('frete_cotacoes','COTF');
    const q = await pool.query(
      `INSERT INTO frete_cotacoes
      (codigo, company_id, orcamento_id, pdv_id, origem_cep, destino_cep, distancia_km, peso_total, cubagem_total, valor_carga, tipo_frete, valor_km, valor_m3, valor_total, observacao, created_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
      [codigo, body.company_id, body.orcamento_id||null, body.pdv_id||null, body.origem_cep, body.destino_cep, distancia, peso, cubagem, body.valor_carga_manual||0, body.tipo_frete||'Complemento', valorKm, valorM3, valor_total, body.observacao||'', req.user?.id || null]
    );
    res.status(201).json(q.rows[0]);
  } catch (err) {
    console.error(err); res.status(500).json({error: err.message});
  }
};

export const converterCotacaoParaManifesto = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const cot = await pool.query('SELECT * FROM frete_cotacoes WHERE id=$1',[id]);
    if (!cot.rows.length) return res.status(404).json({error:'Cotação não encontrada'});
    const codigo = await gerarCodigoSequencial('manifestos','MANF');
    // calc adiantamento/saldo
    let adiantamento=0, saldo=0;
    if (body.forma_pagamento === '50/50') { adiantamento = body.valor_final*0.5; saldo = body.valor_final - adiantamento; }
    else if (body.forma_pagamento === '70/30') { adiantamento = body.valor_final*0.7; saldo = body.valor_final - adiantamento; }
    else if (body.forma_pagamento === '80/20') { adiantamento = body.valor_final*0.8; saldo = body.valor_final - adiantamento; }
    else if (body.forma_pagamento === 'avista') { adiantamento = body.valor_final; saldo = 0; } else { saldo = body.valor_final; }
    const ins = await pool.query(
      `INSERT INTO manifestos
       (codigo, company_id, cotacao_frete_id, pdv_id, motorista_id, transportadora_id, isca_id,
        origem_cep, destino_cep, distancia_km, peso_total, cubagem_total,
        valor_estimado, valor_final, valor_cte, forma_pagamento, pagamento_adiantamento, pagamento_saldo,
        data_inicio, data_previsao_chegada, observacao, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
       RETURNING *`,
      [
        codigo, cot.rows[0].company_id, id, cot.rows[0].pdv_id || null, body.motorista_id || null,
        body.transportadora_id || null, body.isca_id || null,
        cot.rows[0].origem_cep, cot.rows[0].destino_cep, cot.rows[0].distancia_km, cot.rows[0].peso_total, cot.rows[0].cubagem_total,
        cot.rows[0].valor_total, body.valor_final, body.valor_cte || 0, body.forma_pagamento || 'avista',
        adiantamento, saldo, body.data_inicio || null, body.data_previsao_chegada || null, body.observacao || '', req.user?.id || null
      ]
    );
    // update cotacao status
    await pool.query('UPDATE frete_cotacoes SET status=$1 WHERE id=$2',['Convertida em Manifesto', id]);
    // update isca status
    if (body.isca_id) {
      await pool.query('UPDATE iscas_carga SET status=$1, rota_atual=$2, ultima_atualizacao=NOW() WHERE id=$3',['Em Uso', ins.rows[0].codigo, body.isca_id]);
    }
    res.status(201).json({manifesto: ins.rows[0]});
  } catch (err) {
    console.error(err); res.status(500).json({error: err.message});
  }
};
