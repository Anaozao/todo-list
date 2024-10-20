import SequelizeTask from '../../database/models/SequelizeTask';

export type UpdateTaskType = {
  id: number,
  isDone: boolean
}

export default class UpdateTask {
  private model = SequelizeTask;

  async update({ id, isDone }: UpdateTaskType) {
    const taskExists = this.model.findByPk(id)
    if (!taskExists) {
      return { status: 'NOT_FOUND', data: { message: 'Tarefa não encontrada' } }
    }
    if (typeof isDone !== 'boolean') {
      return { status: 'INVALID_VALUE', data: { message: 'isDone deve ser booleano' } }
    }
    await this.model.update(
      {isDone: isDone },
      {where: {id}})

      return { status: 'SUCCESSFUL', data: { message: 'Atualizado' } };
    }
}