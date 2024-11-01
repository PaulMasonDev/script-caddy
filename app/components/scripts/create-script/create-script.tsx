"use client";

import { useState } from "react";
import { createScript } from "../actions";
import SelectTypes from "../components/select-types/select-types";
import ScriptNumber from "../components/select-types/script-number";

export default function CreateScript({
  isAvailable,
  currentScriptNum,
  maxScripts,
}: {
  isAvailable: boolean;
  currentScriptNum: number;
  maxScripts: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [scriptNumber, setScriptNumber] = useState(1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.append("scriptTypes", JSON.stringify(selectedTypes));
    formData.append("numOfScripts", scriptNumber.toString());
    await createScript(formData);
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
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
            defaultValue={"Male"}
          />
        </label>
        <SelectTypes setSelectedOptions={setSelectedTypes} />
        <ScriptNumber
          setScriptNumber={setScriptNumber}
          maxScripts={
            maxScripts - currentScriptNum < 5
              ? maxScripts - currentScriptNum
              : 5
          }
        />
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
