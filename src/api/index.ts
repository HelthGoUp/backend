import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import recipes from './routes/recipes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API Connected',
  });
});

router.use('/recipes', recipes);


export default router;
