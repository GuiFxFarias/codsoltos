"use client";

import { useMutation, useQueryClient } from "react-query";
import { postValues } from "./api";
import PostForm from "./postForm";
import { v4 as uuidv4 } from "uuid";

export default function AddPost() {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: postValues,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["values"] });
    },
  });

  function addValueList(values) {
    postMutation.mutate({
      id: uuidv4(),
      ...values,
    });
  }

  return (
    <div>
      <h1>Add Post</h1>
      <PostForm onSubmit={addValueList} initialValue={" "} />
    </div>
  );
}
