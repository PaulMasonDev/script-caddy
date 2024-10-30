"use server";

import { db } from "@/server/db";
import { scripts } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { getScripts } from "../ai";
import { eq } from "drizzle-orm";

export const createScript = async (formData: FormData) => {
  const user = auth();
  if (!user || !user.userId) {
    throw new Error("You must be logged in to create a script");
  }

  const voiceType = formData.get("voiceType") as string;

  const aiScripts = await getScripts(voiceType);

  aiScripts.forEach(async (script) => {
    const newScript = await db
      .insert(scripts)
      .values({
        userId: user.userId,
        name: script.name,
        direction: script.direction,
        script: script.script,
        pixabayUrl: script.pixabayUrl,
      })
      .returning();
  });
};

export const deleteScript = async (id: number) => {
  const user = auth();
  if (!user || !user.userId) {
    throw new Error("You must be logged in to delete a script");
  }

  await db.delete(scripts).where(eq(scripts.id, id));
};
