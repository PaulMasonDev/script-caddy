"use server";

import { db } from "@/server/db";
import { scripts } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { getScripts } from "../ai";
import { eq } from "drizzle-orm";

export interface ScriptParams {
  voiceType: string;
  scriptTypes: string[];
  numOfScripts: number;
}

export const createScript = async (formData: FormData) => {
  const user = auth();
  if (!user || !user.userId) {
    throw new Error("You must be logged in to create a script");
  }

  const voiceType = formData.get("voiceType") as string;
  const scriptTypes = formData.get("scriptTypes") as unknown as string[];
  const numOfScripts = formData.get("numOfScripts") as string;

  const scriptParams: ScriptParams = {
    voiceType,
    scriptTypes: Array.isArray(scriptTypes) ? scriptTypes : [scriptTypes],
    numOfScripts: +numOfScripts,
  };

  const aiScripts = await getScripts(scriptParams);

  aiScripts.forEach(async (script) => {
    await db
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
