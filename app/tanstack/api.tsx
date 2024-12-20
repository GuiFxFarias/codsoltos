interface IDb {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export async function tanStack({ id }: { id: number }) {
  const request = await fetch(`http://localhost:3333/todos?id=${id}`);

  const data = await request.json();

  return data;
}
export async function tanStackTudo() {
  const request = await fetch(`http://localhost:3333/todos`);

  const values = await request.json();

  return values;
}
