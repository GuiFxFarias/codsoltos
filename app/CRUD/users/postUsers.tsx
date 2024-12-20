"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { putUsers } from "./api/putUsers";
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

import { v4 as uuidv4 } from "uuid";
import { postUsers } from "./api/postUsers";

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
  age: z
    .string({ required_error: "Campo obrigatório" })
    .min(2)
    .max(50, { message: "Escreva corretamente" }),
});

export default function PostUsers() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const updateUsers = useMutation({
    mutationFn: (data: object) => postUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "getUsers" });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let dataPut = { uuidv4, name: values.name, age: values.age };

    updateUsers.mutate(dataPut);
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-slate-800 p-2 rounded-2xl hover:bg-slate-500 text-zinc-100 mt-4">
        Add user
      </DialogTrigger>
      <DialogContent className="bg-zinc-50 rounded-xl">
        <DialogHeader>
          <DialogTitle>Add name or age</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-black font-semibold"
                        />
                      </FormControl>
                      <FormDescription>Change name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-black font-semibold"
                        />
                      </FormControl>
                      <FormDescription>Change age.</FormDescription>
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
