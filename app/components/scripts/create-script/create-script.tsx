"use client";

import { useState } from "react";
import { createScript } from "../actions";

export default function CreateScript({
  isAvailable,
  maxScripts,
}: {
  isAvailable: boolean;
  maxScripts: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await createScript(formData);
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">CREATE SCRIPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="text-lg font-semibold">
            Voice Type (Eg: Warm male barritone)
          </span>
          <input
            type="text"
            name="voiceType"
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter voice type"
            defaultValue={"Warm male barritone"}
          />
        </label>
        <button
          type="submit"
          className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
            isSubmitting || !isAvailable
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400 active:bg-blue-800"
          }`}
          disabled={isSubmitting || !isAvailable}
        >
          {isSubmitting ? "Submitting..." : "Create Script"}
        </button>
        {!isAvailable && (
          <p className="text-sm">
            You can have a max of {maxScripts} script(s). Delete some to make
            room
          </p>
        )}
      </form>
    </div>
  );
}
