import { Router, Request, Response } from 'express';
import AccountRecoveryController from '../controllers/AccountRecoveryController';

const router = Router();
const accountRecoveryController = new AccountRecoveryController();

router.post('/', (_req: Request, res: Response) => accountRecoveryController.recovery(_req, res));

export default router;
