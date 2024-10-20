import SequelizeTask from "../../database/models/SequelizeTask"

export default class DeleteTask {
  private model = SequelizeTask

  async delete(id: number ) {
    const taskExists = await this.model.findByPk(id)
    if(!taskExists) {
      return {status: "NOT_FOUND", data: { message: "Item não encontrado"}}
    }

    await this.model.destroy({where: {id}})
    return {status: 'SUCCESSFUL', data: {message: "Deletado"}}
  }


}