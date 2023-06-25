import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';
import {getRecipe} from '../../services/recipeService';

const recipesRouter = express.Router();

recipesRouter.post<{}, MessageResponse>('/', async (req, res) => {
    const recipes = await getRecipe(req.body.ingredients);
    try{
        console.log(recipes)
        const recipesJson = JSON.parse(recipes);
        if(recipesJson.status >= 400) {
            console.log("Why am I here")
            res.json({status:400, message: "Error"});
        } else {
            res.json(recipesJson);
        }
    } catch (error) {
        console.log(error)
        res.json({status:400, message: "Error"});
    }

});

export default recipesRouter;
