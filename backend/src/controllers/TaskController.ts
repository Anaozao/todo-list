import { Request, Response } from 'express';
import TaskService from '../services/TaskService';
import { http, mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class TaskController {
  private taskService = new TaskService();

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this.taskService.getAll();
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async getAllByUser(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.taskService.getAllByUserId(Number(id));
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.taskService.getById(Number(id));
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async createTask(req: Request, res: Response) {
    const { userId, description } = req.body;
    const { status, data } = await this.taskService.createTask({ userId, description });
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }

  async updateTask(req: Request, res: Response) {
    const {id} = req.params
    const {isDone} = req.body

    const newReq = {
      id: Number(id),
      isDone,
    }
    
    const { status, data } = await this.taskService.updateTask(newReq);
    res.status(mapStatusHTTP(status as keyof typeof http)).json(data);
  }
}
