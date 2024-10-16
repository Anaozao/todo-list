import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { http, mapStatusHttp } from '../utils/mapStatusHTTP';

export default class UserController {
  private userService = new UserService();

  async getUser(req: Request, res: Response) {
    const { email } = req.body;
    const { status, data } = await this.userService.getByEmail(email);
    res.status(mapStatusHttp(status as keyof typeof http)).json(data);
  }

  async getAll(req: Request, res: Response) {
    const { status, data } = await this.userService.getAll();
    res.status(mapStatusHttp(status as keyof typeof http)).json(data);
  }

  async createUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const { status, data } = await this.userService.createUser({ email, username, password });
    res.status(mapStatusHttp(status as keyof typeof http)).json(data);
  }
}
