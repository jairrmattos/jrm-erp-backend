import React, {useState} from 'react';
import api from '../services/api';
export default function ModalConverterManifesto({cotacao,onClose}) {
  const [form,setForm]=useState({valor_final:'',valor_cte:'',forma_pagamento:'avista',motorista_id:'',transportadora_id:'',isca_id:'',data_inicio:'',data_previsao_chegada:'',observacao:''});
  const confirmar=async()=>{ const r=await api.post(`/frete-cotacoes/${cotacao.id}/convert`, form); alert('Manifesto criado: '+r.data.manifesto.codigo); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="font-bold mb-2">Converter {cotacao.codigo}</h3>
        <input placeholder="Valor final" value={form.valor_final} onChange={e=>setForm({...form,valor_final:e.target.value})} className="w-full mb-2"/>
        <input placeholder="Valor CTe" value={form.valor_cte} onChange={e=>setForm({...form,valor_cte:e.target.value})} className="w-full mb-2"/>
        <select value={form.forma_pagamento} onChange={e=>setForm({...form,forma_pagamento:e.target.value})} className="w-full mb-2">
          <option value="avista">À vista</option><option value="50/50">50/50</option><option value="70/30">70/30</option><option value="80/20">80/20</option>
        </select>
        <div className="flex justify-end gap-2"><button onClick={onClose}>Cancelar</button><button onClick={confirmar} className="bg-green-600 text-white px-3 py-1 rounded">Confirmar</button></div>
      </div>
    </div>
  );
}
