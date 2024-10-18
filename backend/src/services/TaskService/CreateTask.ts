import SequelizeTask from '../../database/models/SequelizeTask';
import { CreateTaskData } from '../../interfaces/ITask';
import createTaskValidation from './validations/createTaskValidation';

export default class CreateTask {
  private model = SequelizeTask;

  async create(taskData: CreateTaskData) {
    const error = createTaskValidation(taskData);
    if (error) return { status: error.status, data: { message: error.message } };

    const newTaskData = {
      userId: taskData.userId,
      description: taskData.description,
      isDone: false,
      createdAt: new Date(),
    };

    const newTask = await this.model.create(newTaskData, { raw: true });
    return { status: 'CREATED', data: newTask };
  }
}
