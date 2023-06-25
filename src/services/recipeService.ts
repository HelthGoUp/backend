import { json } from "stream/consumers";

export async function getRecipe(ingredients : string[]) : Promise<string>{
    try {
        //fetch initial recipe data
        const data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.FOOD_API}&ingredients=${ingredients.join(",+")}&number=1`);
        const json = await data.json();
        
        for (let i = 0; i < json.length; i++) {
            delete json[i].imageType;
            json[i].missedIngredients = json[i].missedIngredients.map((ingredient: { original: string; }) => {
                return ingredient.original;
            });
            json[i].usedIngredients = json[i].usedIngredients.map((ingredient: { original: string; }) => {
                return ingredient.original;
            });
            json[i].unusedIngredients = json[i].unusedIngredients.map((ingredient: { original: string; }) => {
                return ingredient.original;
            });
        }

        //get summary for each recipe
        for(let i = 0; i < json.length; i++) {
            const summary = await fetch(`https://api.spoonacular.com/recipes/${json[i].id}/information?apiKey=${process.env.FOOD_API}&includeNutrition=true`);
            const summaryJson = await summary.json();
            json[i]["servings"] = summaryJson.servings;
            json[i]["readyInMinutes"] = summaryJson.readyInMinutes;
            json[i]["vegetarian"] = summaryJson.vegetarian;
            json[i]["calories"] = summaryJson.nutrition.nutrients[0].amount/summaryJson.servings;

            const instructions = await fetch(`https://api.spoonacular.com/recipes/${json[i].id}/analyzedInstructions?apiKey=${process.env.FOOD_API}`);
            const instructionsJson = await instructions.json();
            console.log(instructionsJson)
            json[i]["instructions"] = instructionsJson[0]?.steps.map((steps: { step: string; }) => {
                return steps.step;
            });

            const equipment = await fetch(`https://api.spoonacular.com/recipes/${json[i].id}/equipmentWidget.json?apiKey=${process.env.FOOD_API}`);
            const equipmentJson = await equipment.json();
            json[i]["equipment"] = equipmentJson['equipment'].map((equipment: { name: string; }) => {
                return equipment.name;
            });
        }

        //fetch 
        const response = `{"status": 200, "recipes": ${JSON.stringify(json)}}`

        return response
    } catch (error) {
        console.error(error)
        const response = `{"status": 400, "message": ${error}}`
        return response
    }
}
