import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';

const usersRouter = express.Router();

usersRouter.get<{}, MessageResponse>('/', (req, res) => {
  res.json({message: "Receive users"});
});

export default usersRouter;
