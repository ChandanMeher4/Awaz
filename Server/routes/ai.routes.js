import express from 'express';
import { handleChat } from '../controllers/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post('/', handleChat);

export default aiRouter;
