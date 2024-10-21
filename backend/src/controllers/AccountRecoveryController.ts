import { Request, Response } from 'express';
import AccountRecoveryService from '../services/AccountRecoveryService/AccountRecoveryService';
import { http, mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class AccountRecoveryController {
  private service = new AccountRecoveryService();

  async recovery(req: Request, res: Response) {
    const { email } = req.body;

    const { status, data } = await this.service.resetPass(email);
    return res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }
}
