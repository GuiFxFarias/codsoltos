export async function potsProducts(value: any) {
  const res = await fetch(`http://localhost:3333/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });

  return res.json();
}

export async function postParticipantes(body: any, value: any, id: string) {
  body.participantesDoGrupo.push(value);

  body.participantesDoGrupo.sort((a: any, b: any) => a.index - b.index);

  console.log(body);

  const url = `http://localhost:3333/products/${id}`;

  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return request.json();
}
