export async function putProducts(valuePut: {
  id: string;
  index: number;
  product: string;
  donoDeGrupo: boolean;
  idSeuDono: null;
}) {
  const url = `http://localhost:3333/products/${valuePut.id}`;

  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(valuePut),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return request.json();
}
