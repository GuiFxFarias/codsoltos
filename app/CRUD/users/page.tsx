"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers } from "./api/getUsers";
import { Button } from "@/components/ui/button";
import { delUsers } from "./api/delUsers";
import { Pencil } from "lucide-react";
import { putUsers } from "./api/putUsers";
import { Label } from "@/components/ui/label";
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
import UpdateUsers from "./putUser";
import PostUsers from "./postUsers";

interface IUsers {
  id: string;
  name: string;
  age: string;
}

export default function CrudUsers() {
  const users = useQuery({ queryKey: "getUsers", queryFn: getUsers });

  const queryClient = useQueryClient();

  const deleteUsers = useMutation({
    mutationFn: delUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "getUsers" });
    },
  });

  function funcDeleteUsers(id: string) {
    deleteUsers.mutate(id);
  }

  return (
    <main className="flex flex-col items-center bg-slate-900 h-[100vh]">
      <div className="mt-10">
        <h1 className="text-2xl text-zinc-300">System users - Fx</h1>
      </div>
      <PostUsers />
      <div className="bg-slate-600 h-[50vh] w-[60vw] mt-4 flex items-start justify-start overflow-y-scroll p-10">
        <ul className="w-[100%] ">
          {users?.data?.map((user: IUsers) => (
            <li
              key={user.id}
              className="flex flex-row justify-between items-center w-[100%] py-2 px-10"
            >
              {user.name} / Age: {user.age}
              <Button
                className="bg-slate-800 rounded-2xl hover:bg-slate-500 text-zinc-100"
                onClick={() => funcDeleteUsers(user.id)}
              >
                Delete
              </Button>
              <UpdateUsers id={user.id} name={user.name} age={user.age} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
