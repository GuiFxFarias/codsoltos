export async function getUsers() {
  // const request = await fetch(`https://jsonplaceholder.typicode.com/users`);

  const res = await fetch(`http://localhost:3333/users`);

  const data = res.json();

  return data;
}
