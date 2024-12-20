import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-zinc-50 h-[100vh]">
      <h1 className="text-2xl mt-10 text-zinc-300">Testes de códigos - CRUD</h1>
      <div className="flex flex-col  mt-4 p-2 space-y-2">
        <Link href={"/CRUD/users"}>
          <h1 className="hover:bg-rose-950 text-zinc-300 ring-zinc-600 font-semibold ring-1 p-2 rounded-full ">
            CRUD Users
          </h1>
        </Link>
        <Link href={"/CRUD/products"}>
          <h1 className="hover:bg-rose-950 text-zinc-300 ring-zinc-600 font-semibold ring-1 p-2 rounded-full ">
            CRUD Products
          </h1>
        </Link>
      </div>
    </main>
  );
}
