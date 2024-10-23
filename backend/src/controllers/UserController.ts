import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { http, mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class UserController {
  private userService = new UserService();

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.userService.getById(Number(id));
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async getAll(req: Request, res: Response) {
    const { status, data } = await this.userService.getAll();
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async createUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const { status, data } = await this.userService.createUser({ email, username, password });
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async changePassword(req: Request, res: Response) {
    const { password, token } = req.body;

    const { status, data } = await this.userService.changePassword({ password, token });
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }
}
