import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import DeleteScript from "../delete-script/delete-script";

export default async function ScriptDisplay({
  maxScripts,
}: {
  maxScripts: number;
}) {
  const user = auth();

  if (!user || !user.userId) {
    throw new Error("You must be logged in to view a script");
  }

  const scriptData = await db.query.scripts.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return (
    <div>
      <p>
        Total Scripts: {scriptData.length} ({maxScripts} max)
      </p>
      {scriptData.reverse().map((script) => {
        return (
          <div
            key={script.id}
            className="p-4 mb-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{script.name}</h2>
            <p className="text-gray-700 text-sm mb-2">
              Direction: {script.direction}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Script: &quot;{script.script}&quot;
            </p>
            <a
              href={script.pixabayUrl}
              className="text-blue-500 hover:underline"
            >
              Pixabay Music Search
            </a>
            <DeleteScript id={script.id} />
          </div>
        );
      })}
    </div>
  );
}
