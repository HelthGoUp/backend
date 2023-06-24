import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';
import getRecipe, { } from '../../services/recipeService';

const recipesRouter = express.Router();

recipesRouter.get<{}, MessageResponse>('/', (req, res) => {
    getRecipe();
    res.json({message: "Receive recipes"});
});

export default recipesRouter;
