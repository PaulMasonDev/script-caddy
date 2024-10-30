"use client";

import { useState } from "react";
import { deleteScript } from "../actions";

export default function DeleteScript({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    await deleteScript(id);
    setIsDeleting(false);
    window.location.reload();
  };

  return (
    <div>
      <button
        className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
          isDeleting
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-700 focus:ring-red-400 active:bg-red-800"
        }`}
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
