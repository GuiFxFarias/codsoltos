"use client";

import { useState } from "react";
import { tanStack, tanStackTudo } from "./api";
import { useQuery } from "react-query";

interface IDb {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function PageApi() {
  const [count, setCount] = useState<number>(1);
  const dataValue = useQuery(["users", count], () => tanStack({ id: count }));

  const dataAllValue = useQuery(["allUsers"], () => tanStackTudo());
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col">
      <h1>Lista usando react query</h1>

      <button
        className="bg-blue-300 p-2 rounded-full"
        type="button"
        onClick={() => {
          if (count >= 10) {
            setCount(1);
          } else {
            setCount(count + 1);
            // console.log(data);
          }
        }}
      >
        Next
      </button>
      <button
        className="bg-blue-300 p-2 rounded-full"
        type="button"
        onClick={() => {
          if (count == 1) {
            setCount(10);
          } else {
            setCount(count - 1);
          }
          //   console.log(data);
        }}
      >
        Prev
      </button>
      <p>
        {dataValue.isLoading
          ? "Loading..."
          : dataValue.data?.map((data: IDb) => {
              return data.title;
            })}
      </p>
    </div>
  );
}
