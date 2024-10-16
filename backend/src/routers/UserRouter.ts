import { Router, Request, Response } from 'express';
import UserControler from '../controllers/UserController';

const router = Router();

router.get('/', (req: Request, res: Response) => new UserControler().getAll(req, res));
router.get('/find', (req: Request, res: Response) => new UserControler().getUser(req, res));
router.post('/', (req: Request, res: Response) => new UserControler().createUser(req, res));

export default router;
