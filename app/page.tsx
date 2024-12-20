import Image from 'next/image';
import Link from 'next/link';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <main className='flex flex-col items-center bg-slate-900 h-[100vh]'>
      <h1 className='text-2xl mt-10 text-zinc-300'>Testes de códigos soltos</h1>
      <div className='flex flex-col  mt-4 p-2 space-y-2 overflow-y-scroll my-10'>
        <Link href={'/dashboards'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600 font-semibold ring-1 p-2 rounded-full '>
            Gráficos
          </h1>
        </Link>
        <Link href={'/searchbar'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Searchbar
          </h1>
        </Link>
        <Link href={'/buttonFilter'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Botão de filtro
          </h1>
        </Link>
        <Link href={'/buttonFilterShadcn'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Botão de filtro (Shadcn)
          </h1>
        </Link>
        <Link href={'/formsShadcn'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Formulário (Shadcn)
          </h1>
        </Link>
        <Link href={'/consumoApi'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Consumo de API
          </h1>
        </Link>
        <Link href={'/lista'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Listas
          </h1>
        </Link>
        <Link href={'/tanstack'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Tanstack
          </h1>
        </Link>
        <Link href={'/dataFiltro'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Carrosel calendário
          </h1>
        </Link>
        <Link href={'/put'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Api PUT
          </h1>
        </Link>
        <Link href={'/tanstack02'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Tanstack teste dois
          </h1>
        </Link>
        <Link href={'/CRUD'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Arquivos CRUD
          </h1>
        </Link>
        <Link href={'/dragAndDrop'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Drag and drop
          </h1>
        </Link>
        <Link href={'/cryptoDash'}>
          <h1 className='hover:bg-rose-950 text-zinc-300 ring-zinc-600  font-semibold ring-1 p-2 rounded-full '>
            Criptografia em dash
          </h1>
        </Link>
      </div>
    </main>
  );
}
