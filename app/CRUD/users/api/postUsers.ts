export async function postUsers(valuePut: object) {
  const res = await fetch(`http://localhost:3333/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valuePut),
  });

  return res.json();
}
