export async function postParticipantes(value: any) {
  const res = await fetch(`http://localhost:3333/participantesDoGrupo/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });

  return res.json();
}
