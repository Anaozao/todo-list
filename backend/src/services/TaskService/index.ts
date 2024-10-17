import { CreateTaskData } from '../../interfaces/ITask';
import CreateTask from './CreateTask';
import GetTask from './GetTask';

export default class TaskService {
  private get = new GetTask();
  private create = new CreateTask();

  async getAll() {
    const { status, data } = await this.get.all();
    return { status, data };
  }

  async getById(id: number) {
    const { status, data } = await this.get.byId(id);
    return { status, data };
  }

  async getAllByUserId(userId: number) {
    const { status, data } = await this.get.allByUserId(userId);
    return { status, data };
  }

  async createTask(taskData: CreateTaskData) {
    const { status, data } = await this.create.create(taskData);
    return { status, data };
  }
}
