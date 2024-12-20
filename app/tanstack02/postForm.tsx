"use client";

import { useQueryClient } from "react-query";
import { useState } from "react";

export default function PostForm({
  onSubmit,
  initialValue,
}: {
  onSubmit: any;
  initialValue: any;
}) {
  const [newValue, setNewValue] = useState({
    title: initialValue || "",
    body: initialValue || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(newValue);
    setNewValue({ title: "", body: "" });
  }

  return (
    <div>
      <h1>Segundo teste usando tanstack</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          className="ring-2 mr-2"
          name="title"
          value={newValue.title}
          onChange={(e) =>
            setNewValue({ ...newValue, [e.target.name]: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          className="ring-2 mr-2"
          name="body"
          value={newValue.body}
          onChange={(e) =>
            setNewValue({ ...newValue, [e.target.name]: e.target.value })
          }
        />
        <button className="bg-gray-200 p-1">submit</button>
      </form>
    </div>
  );
}
