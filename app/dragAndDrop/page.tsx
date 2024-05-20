"use client";

import { DragEvent, FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProducts } from "./api/getProducts";
import { potsProducts } from "./api/postProducts";
import { v4 as uuidv4 } from "uuid";
import { ArrowDownFromLine, ArrowsUpFromLine } from "lucide-react";
import { Task } from "./itemDrag";
import { boolean, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DragDropContext,
  DragDropContextProps,
  Droppable,
} from "@hello-pangea/dnd";
import { putProducts } from "./api/putProducts";
import { delProducts } from "./api/delProducts";

const formSchema = z.object({
  product: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
});

export default function DragAndDrop() {
  const { data } = useQuery({ queryKey: "getProducts", queryFn: getProducts });

  const [newItems, setNewItems] = useState(data);

  useEffect(() => {
    setNewItems(data);
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
    },
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: potsProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
  });

  const updateProducts = useMutation({
    mutationFn: (data: { slug: unknown }) => putProducts(data.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "getProducts" });
    },
  });

  const deleteProducts = useMutation({
    mutationFn: delProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "getProducts" });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let positionIndex = 0;
    data.map((item, index) => {
      if (data.length == 0) {
        positionIndex = 0;
      } else {
        positionIndex = index + 1;
      }

      return positionIndex;
    }),
      postMutation.mutate({
        id: uuidv4(),
        index: positionIndex,
        product: values.product,
      });
  }

  function onDragEnd(result: any) {
    const resultArray = Array.from(data);
    if (!result.destination) {
      return;
    }
    const [removed] = resultArray.splice(result.source.index, 1);
    resultArray.splice(result.destination.index, 0, removed);
    resultArray.map((dataArray: unknown, index) => {
      dataArray.index = index;
      let valuePut = {
        id: dataArray.id,
        index: index,
        product: dataArray.product,
      };
      updateProducts.mutate({ slug: valuePut });
    });
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 pt-52">
      <h1 className="font-bold text-4xl text-white mb-4">Tarefas</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl mb-4 flex items-center justify-between"
        >
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o nome da tarefa..."
                    className="flex-1 h-10 rounded-md px-2 w-[35vw]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-blue-500 ml-4 rounded-md px-4 text-white font-medium w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <section className="bg-zinc-100 p-3 rounded-md w-full max-w-2xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list">
            {(provided) => (
              <article ref={provided.innerRef} {...provided.droppableProps}>
                {data
                  ?.sort((a, b) => a.index - b.index)
                  ?.map((task: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mt-1"
                    >
                      <Task task={task} index={index} key={task.id} />
                    </div>
                  ))}

                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
}
