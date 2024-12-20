export async function getValues() {
  const res = await fetch(`http://localhost:3333/todos`);

  const values = await res.json();

  return values;
}

export async function postValues(value: any) {
  const res = await fetch(`http://localhost:3333/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });

  return res.json();
}

export async function deleteValues(id: any) {
  const res = await fetch(`http://localhost:3333/todos/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
