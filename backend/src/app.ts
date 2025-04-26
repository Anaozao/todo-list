import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import UserRouter from './routers/UserRouter';
import TaskRouter from './routers/TaskRouter';
import LoginRouter from './routers/LoginRouter';
import VerifyEmailRouter from './routers/VerifyEmailRouter';
import AccountRecoveryRouter from './routers/AccountRecoveryRouter';

const frontUrl = process.env.FRONT_BASE_URL;

const corsOptions = {
  origin: frontUrl,
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
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use('/users', UserRouter);
    this.app.use('/tasks', TaskRouter);
    this.app.use('/login', LoginRouter);
    this.app.use('/verify-email', VerifyEmailRouter);
    this.app.use('/recovery-account', AccountRecoveryRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
