import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';

const postsRouter = express.Router();

postsRouter.get<{}, MessageResponse>('/', (req, res) => {
  res.json({message: "Receive users"});
});

export default postsRouter;
