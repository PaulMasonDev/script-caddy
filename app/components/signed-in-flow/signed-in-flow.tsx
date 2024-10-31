import { auth } from "@clerk/nextjs/server";
import CreateScript from "../scripts/create-script/create-script";
import ScriptDisplay from "../scripts/script-display/script-display";
import { Landing } from "../welcome-screen/welcome-screen";
import { db } from "@/server/db";

export default async function SignedInFlow() {
  const user = auth();
  const userId = user.userId;
  if (!userId) {
    throw new Error("You must be logged in to view a script");
  }

  const maxScripts = 20;
  const scriptData = await db.query.scripts.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  const isCreateAvailable = scriptData.length < maxScripts;
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Landing headingText="Welcome to Script Caddy!" />
      <CreateScript isAvailable={isCreateAvailable} maxScripts={maxScripts} />
      <ScriptDisplay maxScripts={maxScripts} />
    </div>
  );
}
