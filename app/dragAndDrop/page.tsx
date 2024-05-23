"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProducts } from "./api/getProducts";
import { potsProducts } from "./api/postProducts";
import { v4 as uuidv4 } from "uuid";
import { Group, Ungroup } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { putProducts } from "./api/putProducts";
import { delParticipantes, delProducts } from "./api/delProducts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { putParticipantes } from "./api/putParticipants";
import { getParticipantes } from "./api/getParticipantes";
import { postParticipantes } from "./api/postParticipantes";

const formSchema = z.object({
  product: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
});

export default function DragAndDrop() {
  const products = useQuery({ queryKey: "getProducts", queryFn: getProducts });

  const participantesDoGrupo = useQuery({
    queryKey: "getParticipantes",
    queryFn: getParticipantes,
  });

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

  const postMutationParticipantes = useMutation({
    mutationFn: postParticipantes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getParticipantes"] });
    },
  });

  const mutateParticipantes = useMutation({
    mutationFn: (data: { slug: any }) => putParticipantes(data.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getParticipantes"] });
    },
  });

  const updateProducts = useMutation({
    mutationFn: (data: { slug: any }) => putProducts(data.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
  });

  const deleteProducts = useMutation({
    mutationFn: (id: string) => delProducts(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
  });

  const deleteParticipantes = useMutation({
    mutationFn: (id: string) => delParticipantes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getParticipantes"] });
    },
  });

  function createGroup(task: any) {
    products.data.map((dataArray: any, index: number) => {
      if (task.id == dataArray.id) {
        let valuePut = {
          id: task.id,
          index: task.index,
          product: task.product,
          donoDeGrupo: !task.donoDeGrupo,
          idSeuDono: task.idSeuDono,
        };
        updateProducts.mutate({ slug: valuePut });
      } else {
        return;
      }
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let positionIndex = 0;
    products.data.map((item: any, index: any) => {
      if (products.data.length == 0) {
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
        donoDeGrupo: false,
        idSeuDono: null,
      });
  }

  function onDragEnd(result: any) {
    const resultArray = Array.from(products.data);

    if (result.destination.index == result.source.index) {
      return;
    }

    if (!result.destination) {
      return;
    }
    const [removed]: any = resultArray.splice(result.source.index, 1);
    resultArray.splice(result.destination.index, 0, removed);
    resultArray.map((dataArray: any, index: number) => {
      let valuePost = {};
      if (result.destination.index == dataArray.index) {
        if (dataArray.donoDeGrupo == true && removed.donoDeGrupo == false) {
          //Dentro do grupo
          products.data.map((item: any, index: number) => {
            valuePost = {
              id: removed.id,
              index: index,
              product: removed.product,
              donoDeGrupo: false,
              idSeuDono: dataArray.id,
            };
          });
          postMutationParticipantes.mutate(valuePost);
          deleteProducts.mutate(removed.id);
        }
      }

      let valuePut = {
        id: dataArray.id,
        index: index,
        product: dataArray.product,
        donoDeGrupo: dataArray.donoDeGrupo,
        idSeuDono: dataArray.idSeuDono,
      };
      updateProducts.mutate({ slug: valuePut });
    });
  }

  function onDragEndLevelTwo(result: any) {
    const resultArrayTwo = Array.from(participantesDoGrupo.data);
    const resultArray = Array.from(products.data);
    if (!result.destination) {
      const [removedIn]: any = resultArrayTwo.splice(result.source.index, 1);
      let valuePost = {};

      resultArray.map((itensArray, index) => {
        valuePost = {
          id: removedIn.id,
          index: index,
          product: removedIn.product,
          donoDeGrupo: false,
          idSeuDono: null,
        };
      });
      deleteParticipantes.mutate(removedIn.id);
      postMutation.mutate(valuePost);
    } else {
      const [removedTwo]: any = resultArrayTwo.splice(result.source.index, 1);
      resultArrayTwo.splice(result.destination.index, 0, removedTwo);
      resultArrayTwo.map((dataArray: any, index: number) => {
        // let valuePost = {};
        // if (result.destination.index == dataArray.index) {
        //   if (dataArray.donoDoGrupo == true) {
        //     //Dentro do grupo
        //     dataArray.participantesDoGrupo.map((item: any, index: number) => {
        //       valuePost = {
        //         id: removed.id,
        //         index: index,
        //         product: removed.product,
        //         donoDeGrupo: false,
        //         idSeuDono: removed.idSeuDono,
        //       };
        //     });
        //     mutateParticipantes.mutate({
        //       value: valuePost,
        //       dataPai: dataArray,
        //       id: dataArray.id,
        //     });
        //     deleteProducts.mutate(removed.id);
        //   }
        // }

        let valuePutTwo = {
          id: dataArray.id,
          index: index,
          product: dataArray.product,
          donoDeGrupo: dataArray.donoDeGrupo,
          idSeuDono: dataArray.idSeuDono,
        };
        mutateParticipantes.mutate({ slug: valuePutTwo });
      });
    }
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
                {products.data
                  ?.sort((a: any, b: any) => a.index - b.index)
                  ?.map((task: any, index: number) => (
                    <div key={index}>
                      {task.donoDeGrupo ? (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              className={
                                task.donoDeGrupo == true
                                  ? "w-full bg-zinc-400 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
                                  : "w-full bg-zinc-300 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Accordion
                                type="single"
                                collapsible
                                className="w-[100%]"
                              >
                                <AccordionItem value="item-1">
                                  <AccordionTrigger>
                                    <div className="flex">
                                      {task.product}
                                      {task.donoDeGrupo ? (
                                        <Ungroup
                                          size={30}
                                          className="hover:bg-zinc-500 transition-all rounded p-1 cursor-pointer"
                                          onClick={() => createGroup(task)}
                                        />
                                      ) : (
                                        <Group
                                          size={30}
                                          className="hover:bg-zinc-500 transition-all rounded p-1 cursor-pointer"
                                          onClick={() => createGroup(task)}
                                        />
                                      )}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <DragDropContext
                                      onDragEnd={onDragEndLevelTwo}
                                    >
                                      <Droppable
                                        droppableId="tasksTwo"
                                        type="list"
                                      >
                                        {(providedTwo) => (
                                          <article
                                            ref={providedTwo.innerRef}
                                            {...providedTwo.droppableProps}
                                          >
                                            {participantesDoGrupo.data
                                              .sort(
                                                (a: any, b: any) =>
                                                  a.index - b.index
                                              )
                                              .map(
                                                (
                                                  participante: any,
                                                  indexParticipante: number
                                                ) => {
                                                  if (
                                                    participante.idSeuDono ==
                                                    task.id
                                                  ) {
                                                    return (
                                                      <Draggable
                                                        draggableId={
                                                          participante.id
                                                        }
                                                        index={
                                                          indexParticipante
                                                        }
                                                        key={participante.id}
                                                      >
                                                        {(providedTwo) => (
                                                          <p
                                                            className="mt-1 bg-zinc-200 p-1 rounded hover:bg-zinc-600 hover:text-zinc-200"
                                                            {...providedTwo.draggableProps}
                                                            {...providedTwo.dragHandleProps}
                                                            ref={
                                                              providedTwo.innerRef
                                                            }
                                                          >
                                                            {
                                                              participante.product
                                                            }
                                                          </p>
                                                        )}
                                                      </Draggable>
                                                    );
                                                  } else {
                                                    return null;
                                                  }
                                                }
                                              )}
                                            {providedTwo.placeholder}
                                          </article>
                                        )}
                                      </Droppable>
                                    </DragDropContext>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              className={
                                task.donoDeGrupo == true
                                  ? "w-full bg-zinc-400 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
                                  : "w-full bg-zinc-300 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <p className="font-medium">{task.product}</p>
                              {task.donoDeGrupo ? (
                                <Ungroup
                                  size={30}
                                  className="hover:bg-zinc-500 transition-all rounded p-1 cursor-pointer"
                                  onClick={() => createGroup(task)}
                                />
                              ) : (
                                <Group
                                  size={30}
                                  className="hover:bg-zinc-500 transition-all rounded p-1 cursor-pointer"
                                  onClick={() => createGroup(task)}
                                />
                              )}
                            </div>
                          )}
                        </Draggable>
                      )}
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

{
  /* <Draggable draggableId={item.id} index={index} key={item.id}>
  {(provided) => (
    <p
      className="mt-1 bg-zinc-200 p-1 rounded"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      {item.product}
    </p>
  )}
</Draggable>; */
}
