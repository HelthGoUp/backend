import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';

const postsRouter = express.Router();

//get all posts ordered by date
postsRouter.get<{}, MessageResponse>('/', (req, res) => {
  res.json({message: "Receive users"});
});

export default postsRouter;
