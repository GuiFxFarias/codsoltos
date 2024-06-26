export async function delProducts(id: string) {
  const res = await fetch(`http://localhost:3333/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function delParticipantes(id: string) {
  const res = await fetch(`http://localhost:3333/participantesDoGrupo/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
