export function formatOptions(options: string[]): string {
  if (options.length === 0) return "";
  if (options.length === 1) return options[0];
  if (options.length === 2) return `${options[0]} and ${options[1]}`;

  const lastOption = options.pop();
  return `${options.join(", ")}, and ${lastOption}`;
}
