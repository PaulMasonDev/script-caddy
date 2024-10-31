"use client";

const types: string[] = [
  "commercial",
  "narration",
  "e-learning",
  "documentary",
  "trailers",
  "animation character",
  "video game character",
  "anime character",
  "audiobooks",
];

export default function SelectTypes({
  setSelectedOptions,
}: {
  setSelectedOptions: (options: string[]) => void;
}) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(options);
  };
  return (
    <label className="block mb-4">
      <span className="text-lg font-semibold">
        Script types (ctrl-click to select multiple) - ALL by default
      </span>
      <select
        multiple
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
        onChange={handleSelectChange}
        defaultValue={types}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
  );
}
