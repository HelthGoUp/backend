import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';
import getRecipe, { } from '../../services/recipeService';

const recipesRouter = express.Router();

recipesRouter.post<{}, MessageResponse>('/', async (req, res) => {
    const recipes = await getRecipe(req.body.uid, req.body.ingredients);
    //
    res.json(JSON.parse(recipes));
});

recipesRouter.post<{}, MessageResponse>('/modifications', async (req, res) => {

});
export default recipesRouter;
