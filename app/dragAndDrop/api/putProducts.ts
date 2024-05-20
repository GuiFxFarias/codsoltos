export async function putProducts(valuePut: {
  id: string;
  product: string;
  index: number;
  ownerGroupd: boolean;
  subordinateGroup: boolean;
  groupIdOwner: null;
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
