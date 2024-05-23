export async function getParticipantes() {
  const res = await fetch(`http://localhost:3333/participantesDoGrupo`);

  const data = await res.json();

  return data;
}
