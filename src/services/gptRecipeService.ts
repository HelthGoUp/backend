import { Configuration, OpenAIApi } from "openai";
import RecipeResponse from "../interfaces/RecipeResponse";

const history = new Map();

export async function getRecipe(uid : number, ingredients : string[]) : Promise<string>{
    const configuration = new Configuration({
        organization: "org-cQ2YVTvrwT6jl05vx4h02usx",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    history.set(uid,
        [
            {
                role: 'system',
                content:
                    'You are an experienced chef and food scientist that speaks only in JSON. Do not speak normal text.',
            },
            {
                role: 'user',
                content: generatePrompt(ingredients, true),
            }
        ]
    );

    try {
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: history.get(uid),
            temperature: 0.7,
        })
        history.set(uid, [...history.get(uid), { role: 'assistant', content: result.data.choices[0].message?.content}])
        const response = `{"status": 200, "message": ${result.data.choices[0].message?.content}}`
        return response
    } catch (error) {
        console.error(error)
        const response = `{"status": 400, "message": ${error}}`
        return response
    }
}

export async function makeImprovement(uid : number, improvements : string[]) : Promise<string>{
    const configuration = new Configuration({
        organization: "org-cQ2YVTvrwT6jl05vx4h02usx",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    history.set(uid, 
        [...history.get(uid), 
            { role: 'user', content: generateImprovementPrompt(true, improvements)}
        ]
        );

    try {
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: history.get(uid),
            temperature: 0.7,
        })
        history.set(uid, [...history.get(uid), { role: 'assistant', content: result.data.choices[0].message?.content}])
        const response = `{"status": 200, "message": ${result.data.choices[0].message?.content}}`
        return response
    } catch (error) {
        console.error(error)
        const response = `{"status": 400, "message": ${error}}`
        return response
    }
}

function generateImprovementPrompt(basics:boolean, improvements : string[]) : string {
    const res = ` I am making a meal plan and only have access to a list of ingredients ${basics?" and the basics like Salt, Pepper, Water":""}. Can you give me 5 detailed recipes for dishes that uses ingredients from the list above.\n\n Can you make the following Improvements to the list of recipes above. ${improvements.join(". ")}. \n\n Make sure the dish includes atleast 2 servings and make sure to include the name of the dish, a detailed list of ingredients used in the recipe with amounts, very intricate and detailed instructions on how to make the dish, the average number of servings, nutrition information about the dish, the estimated time to make the dish, the difficulty of the dish on a scale of 1 to 5, and any equipment needed to make the dish. \n\n Follow this JSON structure strictly
    {
        recipes: [
            {
                "name": "Bacon and Pepper Breakfast Sandwich",
                "ingredients": [
                    {"name": "Bread", "quantity": "200g"},
                    {"name": "Bacon", "quantity": "100g"},
                    {"name": "Peppers", "quantity": "100g"},
                    {"name": "Butter", "quantity": "50g"}
                ],
                "nutrition": {
                    "calories": 50;
                    "carbs": 4;
                    "fat": 60;
                    "protein": 150;
                    "fiber": 7;
                },
                "instructions": [
                    "Fry bacon in a pan until crispy, then set aside.",
                    "Slice peppers and sauté in the bacon grease until tender.",
                    "Toast bread in a toaster or on a griddle.",
                    "Assemble sandwich by spreading butter on each slice of bread, then adding bacon and peppers in between."
                ],
                servings: 2,
                "estimatedTime": 10,
                "difficulty": 2,
                "equipment": ["Pan", "Toaster"]
            },
            {
                "name": "Basil and Pepper Egg Scramble",
                "ingredients": [
                    {"name": "Eggs", "quantity": "3"},
                    {"name": "Peppers", "quantity": "1"},
                    {"name": "Basil", "quantity": "100g"},
                    {"name": "Butter", "quantity": "15ml"}
                ],
                "nutrition": {
                    "calories": 50;
                    "carbs": 4;
                    "fat": 60;
                    "protein": 150;
                    "fiber": 7;
                },
                "instructions": [
                    "Chop peppers and basil into small pieces.",
                    "Crack eggs into a bowl and whisk together.",
                    "Melt butter in a pan over medium heat.",
                    "Add peppers and basil and sauté for 2-3 minutes.",
                    "Pour in eggs and stir constantly until fully cooked."
                ],
                servings: 4,
                "estimatedTime": 30,
                "difficulty": 4,
                "equipment": ["Pan"]
            }
        ],
    }
     Please DO NOT include any other information in your response.
    `;

    return res;
}



function generatePrompt(ingredients : string[], basics : boolean) : string {
    const res = `I am making a meal plan and only have access to a list of ingredients${basics?" and the basics like Salt, Pepper, Water":""}. Can you give me 5 detailed recipes for dishes that uses ingredients from the following list: ${ingredients.join(", ")}. \n\n Make sure the dish includes atleast 2 servings and make sure to include the name of the dish, a detailed list of ingredients used in the recipe with amounts, very intricate and detailed instructions on how to make the dish, the average number of servings, nutrition information about the dish, the estimated time to make the dish, the difficulty of the dish on a scale of 1 to 5, and any equipment needed to make the dish. \n\n Follow this JSON structure strictly
    {
        recipes: [
            {
                "name": "Bacon and Pepper Breakfast Sandwich",
                "ingredients": [
                    {"name": "Bread", "quantity": "200g"},
                    {"name": "Bacon", "quantity": "100g"},
                    {"name": "Peppers", "quantity": "100g"},
                    {"name": "Butter", "quantity": "50g"}
                ],
                "nutrition": {
                    "calories": 50;
                    "carbs": 4;
                    "fat": 60;
                    "protein": 150;
                    "fiber": 7;
                },
                "instructions": [
                    "Fry bacon in a pan until crispy, then set aside.",
                    "Slice peppers and sauté in the bacon grease until tender.",
                    "Toast bread in a toaster or on a griddle.",
                    "Assemble sandwich by spreading butter on each slice of bread, then adding bacon and peppers in between."
                ],
                servings: 2,
                "estimatedTime": 10,
                "difficulty": 2,
                "equipment": ["Pan", "Toaster"]
            },
            {
                "name": "Basil and Pepper Egg Scramble",
                "ingredients": [
                    {"name": "Eggs", "quantity": "3"},
                    {"name": "Peppers", "quantity": "1"},
                    {"name": "Basil", "quantity": "100g"},
                    {"name": "Butter", "quantity": "15ml"}
                ],
                "nutrition": {
                    "calories": 50;
                    "carbs": 4;
                    "fat": 60;
                    "protein": 150;
                    "fiber": 7;
                },
                "instructions": [
                    "Chop peppers and basil into small pieces.",
                    "Crack eggs into a bowl and whisk together.",
                    "Melt butter in a pan over medium heat.",
                    "Add peppers and basil and sauté for 2-3 minutes.",
                    "Pour in eggs and stir constantly until fully cooked."
                ],
                servings: 4,
                "estimatedTime": 30,
                "difficulty": 4,
                "equipment": ["Pan"]
            }
        ],
    }
     Make sure the JSON is complete and Please DO NOT include any other information in your response.
    `;

    return res;
}