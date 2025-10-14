export const calcularDistancia = async (origemCEP, destinoCEP) => {
  // Placeholder: integrate RotasBrasil or Google Distance Matrix.
  // For now, returns 0 if missing or a mock distance
  if (!origemCEP || !destinoCEP) return 0;
  // simple mock: compute pseudo-distance using numeric parts
  const o = origemCEP.replace(/\D/g,'').slice(0,5);
  const d = destinoCEP.replace(/\D/g,'').slice(0,5);
  const diff = Math.abs(Number(o || 0) - Number(d || 0));
  return Math.max(50, Math.round(diff / 10));
};
