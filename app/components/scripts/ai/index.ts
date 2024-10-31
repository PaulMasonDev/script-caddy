import { ScriptParams } from "../actions";
import { createScriptsPrompt, ScriptResponse } from "./prompt";

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const getScripts = async (
  scriptParams: ScriptParams
): Promise<ScriptResponse[]> => {
  try {
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: createScriptsPrompt(scriptParams) }],
          temperature: 0.7,
        }),
      }
    );

    if (!openAIResponse.ok) {
      throw new Error("Failed to fetch from OpenAI");
    }

    const data: OpenAIResponse = await openAIResponse.json();
    const jsonData = JSON.parse(data.choices[0].message.content);
    return jsonData;
  } catch (error) {
    console.error("Error fetching scripts", error);
    return [];
  }
};
