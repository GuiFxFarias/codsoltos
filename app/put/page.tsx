export default async function ApiPut() {
  const request = await fetch(`http://localhost:3333/todos?id=${id}`);

  const data = await request.json();

  return data;

  function onSubmit() {}

  return (
    <div>
      <button>Click Me</button>
    </div>
  );
}
