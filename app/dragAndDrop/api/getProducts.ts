export async function getProducts() {
  const res = await fetch(`http://localhost:3333/products`);

  const data = await res.json();

  return data;
}
