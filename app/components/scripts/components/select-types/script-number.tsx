"use client";

export default function ScriptNumber({
  setScriptNumber,
}: {
  setScriptNumber: (value: number) => void;
}) {
  const maxScripts = 5;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setScriptNumber(value);
  };

  return (
    <label className="block mb-4">
      <span className="text-lg font-semibold">
        How many Scripts? (1 to {maxScripts})
      </span>
      <input
        type="number"
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        min="1"
        max={maxScripts}
        step="1"
        defaultValue="1"
        onChange={handleChange}
      />
    </label>
  );
}
