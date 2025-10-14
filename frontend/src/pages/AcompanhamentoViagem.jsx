import React, {useEffect, useState} from 'react';
import api from '../services/api';
import TrackingTimeline from '../components/TrackingTimeline';
export default function AcompanhamentoViagem(){
  const [manifestos,setManifestos]=useState([]);
  const [selected,setSelected]=useState(null);
  useEffect(()=>{ api.get('/manifestos').then(r=>setManifestos(r.data)); },[]);
  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div className="col-span-1 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Viagens</h3>
        <ul>{manifestos.map(m=>(
          <li key={m.id} className="py-2 border-b cursor-pointer" onClick={()=>setSelected(m)}>{m.codigo} - {m.status}</li>
        ))}</ul>
      </div>
      <div className="col-span-2 bg-white p-4 rounded shadow">
        {selected ? <div><h2>{selected.codigo}</h2><p>Status: {selected.status}</p><TrackingTimeline manifestoId={selected.id} /></div> : <p>Selecione uma viagem</p>}
      </div>
    </div>
  );
}
