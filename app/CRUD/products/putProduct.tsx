"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { putProducts } from "./api/putProducts";

const formSchema = z.object({
  product: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
  category: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
  price: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
  description: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
});

export default function UpdateProducts({
  id,
  product,
  category,
  price,
  description,
}: {
  id: any;
  product: string;
  category: string;
  price: string;
  description: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: product,
      category: category,
      price: price,
      description: description,
    },
  });

  const updateUsers = useMutation({
    mutationFn: (data: object) => putProducts(data, id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "getProducts" });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let dataPut = {
      id,
      product: values.product,
      category: values.category,
      price: values.price,
      description: values.description,
    };

    updateUsers.mutate(dataPut);
  }

  return (
    <Dialog>
      <DialogTrigger className="ml-2 bg-slate-800 p-1 rounded-2xl hover:bg-slate-500 text-zinc-100">
        Edit Product
      </DialogTrigger>
      <DialogContent className="bg-zinc-50 rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          defaultValue={product}
                          className="text-black font-semibold"
                        />
                      </FormControl>
                      <FormDescription>Change Product Name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={category}
                          {...field}
                          className="text-black font-semibold"
                        />
                      </FormControl>
                      <FormDescription>Change category.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
