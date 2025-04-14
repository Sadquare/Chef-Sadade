import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a multilingual chef who invents creative recipes. 
You must reply in the **exact same language** as the ingredients provided by the user.
Respond only with the recipe in markdown format.`;

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
    );

    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (err) {
    console.error("Erreur lors de l'appel à Gemini API :", err.message);
    return "❌ Une erreur est survenue avec l'API Gemini.";
  }
}





/*import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_ACCESS_TOKEN) //IMPORTANT

const SYSTEM_PROMPT = `You are a helpful chef who loves to invent creative recipes from ingredients. 
You only reply with the recipe in markdown format.`

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ")

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    })

    return response.choices[0].message.content
  } catch (err) {
    console.error("Erreur lors de l'appel API :", err.message)
    return "❌ Une erreur est survenue."
  }
}*/

/*import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}

await main();*/

