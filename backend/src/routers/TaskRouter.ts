import { Router, Request, Response, NextFunction } from 'express';
import TaskController from '../controllers/TaskController';
import Auth from '../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().getAll(req, res),
);
router.get(
  '/user/:id',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().getAllByUser(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().getById(req, res),
);

router.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().updateTask(req, res),
);

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().deletTask(req, res),
);

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => new TaskController().createTask(req, res),
);

export default router;
