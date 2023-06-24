export interface ingredient {
    name: string;
    quantity: string;
}

export interface nutrition {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
    fiber: number;
}    

export interface Recipe {
    name: string;
    ingredients: ingredient[];
    nutrition: nutrition;
    instructions: string[];
    estimatedTime: number;
    difficulty: number;
    equipment: string[];
}

export default interface RecipeResponse {
    recipes: Recipe[];
}

