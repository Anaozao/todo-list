import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import UserRouter from './routers/UserRouter';
import TaskRouter from './routers/TaskRouter';
import LoginRouter from './routers/LoginRouter';
import VerifyEmailRouter from './routers/VerifyEmailRouter';
import AccountRecoveryController from './routers/AccountRecoveryRouter';

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/users', UserRouter);
    this.app.use('/tasks', TaskRouter);
    this.app.use('/login', LoginRouter);
    this.app.use('/verify-email', VerifyEmailRouter);
    this.app.use('/recovery-account', AccountRecoveryController);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
