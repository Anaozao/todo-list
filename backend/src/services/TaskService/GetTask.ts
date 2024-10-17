import SequelizeUser from '../../database/models/SequelizeUser';
import SequelizeTask from '../../database/models/SequelizeTask';

const sequelizeConfig = {
  raw: true,
  include: [
    { model: SequelizeUser, as: 'user', attributes: ['username'] },
  ],
};

export default class GetTask {
  private taskModel = SequelizeTask;
  private userModel = SequelizeUser;

  async all() {
    console.log(this.taskModel);
    const tasks = await this.taskModel.findAll(sequelizeConfig);
    console.log(tasks);

    return { status: 'SUCCESSFUL', data: tasks };
  }

  async byId(id: number) {
    if (!id) return { status: 'BAD_REQUEST', data: { message: 'o campo "id" é obrigatório' } };
    const task = await this.taskModel.findByPk(id, sequelizeConfig);
    if (!task) return { status: 'NOT_FOUND', data: { message: 'Tarefa não encontrada' } };
    return { status: 'SUCCESSFUL', data: task };
  }

  async allByUserId(userId: number) {
    if (!userId) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'o campo "userId" é obrigatório' } };
    }
    const userExists = await this.userModel.findByPk(userId);
    if (!userExists) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };

    const tasks = await this.taskModel.findAll({ where: { userId }, ...sequelizeConfig });
    return { status: 'SUCCESSFUL', data: tasks };
  }
}
