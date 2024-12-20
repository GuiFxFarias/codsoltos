export async function delUsers(id: string) {
  const res = await fetch(`http://localhost:3333/users/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
