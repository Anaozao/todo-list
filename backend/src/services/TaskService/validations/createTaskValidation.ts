import { CreateTaskData } from '../../../interfaces/ITask';

const createTaskValidation = (taskData: CreateTaskData) => {
  const { description, userId } = taskData;
  if (!description) {
    return { status: 'BAD_REQUEST', message: 'O campo "description" é obrigatório' };
  }
  if (description.length < 5) {
    return {
      status: 'INVALID_VALUE',
      message: 'O campo "description" deve ter no mínimo 5 caracteres' };
  }
  if (!userId) {
    return { status: 'BAD_REQUEST', message: 'O campo "userId" é obrigatório' };
  }
  if (typeof userId !== 'number') {
    return { status: 'INVALID_VALUE', message: 'O campo "userId" deve ser um número' };
  }
};

export default createTaskValidation;
