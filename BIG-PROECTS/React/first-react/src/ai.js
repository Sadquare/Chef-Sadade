import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_ACCESS_TOKEN)

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
}
