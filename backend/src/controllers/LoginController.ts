import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { http, mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login({ email, password });

    return res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }
}
