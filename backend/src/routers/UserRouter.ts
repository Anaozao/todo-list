import { Router, Request, Response, NextFunction } from 'express';
import UserControler from '../controllers/UserController';
import Auth from '../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new UserControler().getAll(req, res),
);
router.get(
  '/find',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new UserControler().getUser(req, res),
);
router.post(
  '/',
  (req: Request, res: Response) => new UserControler().createUser(req, res),
);

export default router;