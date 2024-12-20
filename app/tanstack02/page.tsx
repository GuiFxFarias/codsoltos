"use client";

import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { deleteValues, getValues } from "./api";
import AddPost from "./addPost";
import Error from "next/error";

interface IQuery {
  id: string;
  title: string;
  body: string;
}

export default function List() {
  const dataAllValues = useQuery({ queryKey: "values", queryFn: getValues });
  const queryClient = useQueryClient();

  const delValueMutation = useMutation({
    mutationFn: deleteValues,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["values"] });
    },
  });

  const funcDelValues = (id: any) => {
    delValueMutation.mutate(id);
  };

  return (
    <div>
      <AddPost />
      {dataAllValues.data?.map((value: IQuery) => {
        return (
          <div key={value.id} className="flex">
            <h2 className="mr-2">{value.title}</h2>
            <h3>{value.body}</h3>
            <button
              className="ml-2 bg-red-300 p-1 rounded-xl"
              onClick={() => funcDelValues(value.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
