import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import posts from './routes/posts';
import users from './routes/users';
import recipes from './routes/recipes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API Connected',
  });
});

router.use('/posts', posts);
router.use('/users', users);
router.use('/recipes', recipes);


export default router;
