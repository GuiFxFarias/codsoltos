"use client";

import { useQuery } from "react-query";
import { getProducts } from "./api/getProducts";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import UpdateProducts from "./putProduct";
import { useRouter } from "next/navigation";

interface IProducts {
  id: string;
  product: string;
  category: string;
  price: number;
  description: string;
}

interface ISearchParams {
  category: string;
  page?: string;
}

export default function CrudProducts({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const router = useRouter();

  const { data } = useQuery({ queryKey: "getProducts", queryFn: getProducts });

  const [valueName, setValueName] = useState("");

  const lowerCaseName = valueName.toLowerCase();

  const filteredProducts = data?.filter((product: IProducts) => {
    if (searchParams.category) {
      return (
        product.category.toLowerCase().includes(searchParams.category) &&
        product.product.toLowerCase().includes(lowerCaseName)
      );
    }

    return product.product.toLowerCase().includes(lowerCaseName);
  });

  return (
    <main className="flex flex-col items-center bg-slate-900 h-[100vh]">
      <div className="mt-10">
        <h1 className="text-2xl text-zinc-300">System products - Fx</h1>
      </div>
      <div className="bg-slate-600 h-[50vh] w-[60vw] mt-4 flex flex-col items-start justify-start overflow-y-scroll p-10">
        <div className="bg-zinc-300 text-black p-2 rounded-xl mb-4 flex">
          <Link href={"http://localhost:3000/CRUD/products?category=camisetas"}>
            Camisetas
          </Link>
          {searchParams.category == "camisetas" ? (
            <Link href={"http://localhost:3000/CRUD/products"}>
              <X />
            </Link>
          ) : null}
        </div>

        <ul className="w-[100%] space-y-4">
          <Input
            className="rounded-xl mb-8"
            value={valueName}
            onChange={(e) => setValueName(e.target.value)}
          />
          {filteredProducts?.map((product: IProducts, i: any) => (
            <li key={i}>
              {product.product} / Category: {product.category} / Description:{" "}
              {product.description}
              <UpdateProducts
                product={product.product}
                price={product.price}
                category={product.category}
                id={product.id}
                description={product.description}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 text-zinc-50 space-x-5">
        <Button
          onClick={() =>
            router.push(`http://localhost:3000/CRUD/products?page=${1}`)
          }
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            router.push(`http://localhost:3000/CRUD/products?page=${2}`)
          }
        >
          Next
        </Button>
      </div>
    </main>
  );
}
