export async function potsProducts(value: any) {
  const res = await fetch(`http://localhost:3333/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });

  return res.json();
}
