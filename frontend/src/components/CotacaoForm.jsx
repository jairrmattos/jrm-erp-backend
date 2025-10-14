import React, {useState} from 'react';
import api from '../services/api';
export default function CotacaoForm({onCreated}) {
  const [form,setForm] = useState({company_id:'',origem_cep:'',destino_cep:'',peso_manual:'',cubagem_manual:''});
  const submit = async e => { e.preventDefault(); await api.post('/frete-cotacoes', form); alert('Criada'); onCreated?.(); };
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-2 gap-2">
        <input name="company_id" placeholder="Company ID" value={form.company_id} onChange={e=>setForm({...form,company_id:e.target.value})}/>
        <input name="origem_cep" placeholder="Origem CEP" value={form.origem_cep} onChange={e=>setForm({...form,origem_cep:e.target.value})}/>
        <input name="destino_cep" placeholder="Destino CEP" value={form.destino_cep} onChange={e=>setForm({...form,destino_cep:e.target.value})}/>
        <input name="peso_manual" placeholder="Peso" value={form.peso_manual} onChange={e=>setForm({...form,peso_manual:e.target.value})}/>
        <input name="cubagem_manual" placeholder="Cubagem" value={form.cubagem_manual} onChange={e=>setForm({...form,cubagem_manual:e.target.value})}/>
      </div>
      <button className="mt-3 bg-green-600 text-white px-3 py-2 rounded">Gerar Cotação</button>
    </form>
  );
}
