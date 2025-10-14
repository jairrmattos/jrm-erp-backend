import React, {useEffect, useState} from 'react';
import api from '../services/api';
export default function TrackingTimeline({manifestoId}) {
  const [list,setList]=useState([]);
  useEffect(()=>{ if (!manifestoId) return; api.get(`/manifestos/${manifestoId}/tracking`).then(r=>setList(r.data)).catch(()=>setList([])); },[manifestoId]);
  return (
    <div>
      <h4 className="font-semibold">Acompanhamento</h4>
      <ul>{list.map(i=> <li key={i.id} className="border p-2 my-2">{i.status_atual} - {i.localizacao} - {i.observacao}</li>)}</ul>
    </div>
  );
}
