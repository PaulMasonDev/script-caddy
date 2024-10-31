// TODO: Make passing the 20 keywords dynamic to user input
// TODO: Make the voiceType dynamic to user input
// TODO: Make the mix dynamic to user input

import { ScriptParams } from "../actions";
import { formatOptions } from "./utils";

// TODO: Make the numberOfScripts dynamic to user input
export type ScriptResponse = {
  name: string;
  direction: string;
  script: string;
  pixabayUrl: string;
};

export const createScriptsPrompt = (scriptParams: ScriptParams) => {
  const mix = "I would like a mix of 15 and 30-second scripts";
  const voice = `I have a ${scriptParams.voiceType} voice.`;
  const ask = `I'm looking to create ${scriptParams.numOfScripts} demo voice-over script(s). No more, no less`;
  const typeAsk = `The scripts should include ${formatOptions(
    scriptParams.scriptTypes
  )} to showcase variety.`;
  const direction =
    "The script(s) should be authentic, conversational, and relatable. Please provide direction notes for each script on tone, pacing, and delivery.";
  const keywordAsk =
    "Also, provide three associated keywords from the following list for each script: Authentic Conversational Relatable Warm Friendly Natural Engaging Approachable Sincere Trustworthy Confident Professional Down-to-earth Genuine Casual Dynamic Empathetic Inspiring Clear Articulate. These words should also be used in the title, along with a description of the script, for example 'Approachable, Friendly, Inspiring - Travel Agency Ad'";
  const pixaBayAsk =
    "Lastly, generate a single keyword for each script to use for music searches on Pixabay, and present it as a clickable URL in the format: 'https://pixabay.com/music/search/[keyword]'.";
  const format = `Your response should be in raw JSON format. You will return an array of scripts,  script is an object with string properties - name, direction, script, pixabayUrl. Do not create any extra properties. Do not add anything extra, the responses need to be consistent in format. For example, NEVER put '\`\`\`json' in your response, since we already know its always json`;
  const clarifications =
    "Make sure that if the number of scripts defined is 1, then you only generate one script, not matter what else is in the prompt. Also, the name and pixabayUrl should never exceed 256 characters each. The direction and script should never exceed 1024 characters each. You should also make sure all of them you generate are for different things. For example, you don't want to generate 5 coffee shop scripts";

  // TODO: Figure out how to get AI to generate a character script rather than a promo
  //   const characterClarifications =

  return `${ask} ${voice} ${mix} ${typeAsk} ${direction} ${keywordAsk} ${pixaBayAsk} ${format} ${clarifications}`;
};

const ex1 =
  "The Chevy Silverado Trail Boss, When you have a two inch lift…When you have Goodyear Duratrack tires…When you have Rancho shocks…and an integrated dual exhaust…When you have all that…The last thing you’ll need…is a road…The Chevy Silverado Trail Boss.Ready to off-road…right from the factory.Chevy….find new roads…";
const ex2 =
  "When we’re born, we are more alike than different. But somewhere along the way, we start to believe the more distant we are from each other…the more distant we are. It’s not until we venture into the world that we see all we share. Maybe that’s the power of flight. Delta isn’t just flying to bring us together…but to show, we were never that far apart to begin with.";

const exampleScripts = `Here are a couple of examples of scripts you might generate: ${ex1} | ${ex2}`;
export const systemPrompt = `You are an AI with 30 years of expertise in professional voiceover work, specializing in creating copy for voiceovers that effectively conveys intent. Your deep experience includes mastering the art of tone, pacing, and word choice to enhance any message’s clarity and impact. You are adept at crafting scripts that communicate nuanced emotions and intentions, tailored precisely to connect with the audience. ${exampleScripts}`;
