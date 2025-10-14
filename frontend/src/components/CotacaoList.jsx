import React, {useEffect, useState} from 'react';
import api from '../services/api';
import ModalConverterManifesto from './ModalConverterManifesto';
export default function CotacaoList() {
  const [cotacoes,setCotacoes]=useState([]);
  const [sel,setSel]=useState(null);
  const load=async()=>{ const r=await api.get('/frete-cotacoes'); setCotacoes(r.data); };
  useEffect(()=>{load()},[]);
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-semibold mb-3">Cotações</h3>
      <table className="w-full">
        <thead><tr><th>Código</th><th>Origem</th><th>Destino</th><th>Valor Estimado</th><th>Ações</th></tr></thead>
        <tbody>
          {cotacoes.map(c=>(
            <tr key={c.id}><td>{c.codigo}</td><td>{c.origem_cep}</td><td>{c.destino_cep}</td><td>R$ {c.valor_total}</td>
            <td>{c.status==='Em Cotação' && <button onClick={()=>setSel(c)}>Converter</button>}</td></tr>
          ))}
        </tbody>
      </table>
      {sel && <ModalConverterManifesto cotacao={sel} onClose={()=>setSel(null)} />}
    </div>
  );
}
