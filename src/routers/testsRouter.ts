import { Router } from 'express';
import testsController from '../controllers/testsController.js';

const testRouter = Router();

testRouter.post('/reset-database', testsController.resetDatabase);
testRouter.post('/seed/recommendations', testsController.seedRecommendations);

export default testRouter;