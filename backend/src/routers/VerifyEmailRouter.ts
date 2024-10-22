import { Router, Request, Response } from 'express';
import VerifyEmailController from '../controllers/VerifyEmailController';

const router = Router();
const verifyEmailController = new VerifyEmailController();

router.get('/', (_req: Request, res: Response) => verifyEmailController.verify(_req, res));

export default router;
