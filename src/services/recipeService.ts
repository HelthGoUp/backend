import { Configuration, OpenAIApi } from "openai";

export default async function getRecipe() {
    const configuration = new Configuration({
        organization: "org-cQ2YVTvrwT6jl05vx4h02usx",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listEngines();
    console.log(response);
}
