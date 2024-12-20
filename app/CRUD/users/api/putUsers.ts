export async function putUsers(valuePut: object, id: any) {
  const url = `http://localhost:3333/users/${id}`;

  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(valuePut),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(valuePut);

  return request.json();
}
