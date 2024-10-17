export default interface ITask {
  id: number,
  userId: number,
  description: string,
  isDone: boolean
  createdAt: Date
}

export interface ITaskWithUser extends ITask {
  username: string
}

export interface CreateTaskData {
  userId: number,
  description: string,
}
