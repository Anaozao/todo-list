export type LoginResponse = { token: string} | { message: string}

export type CreateAccountData = {
  email: string,
  username: string,
  password: string
}

export type UserFromDecodedToken = {
  email: string,
  iat: number,
  id: number,
  username: string
}

export type ReduxState = {
  user: {
    username: string,
    email: string,
    id: number,
    isLogged: boolean,
  },
  tasks: {
    allTasks: TaskType[],
    deletTask: number
  }
}

export type TaskType = {
  id: number,
  userId: number,
  description: string,
  isDone: boolean
  createdAt: string
}

export type CreateTask =  {userId: number, description: string}

export type UpdateTask =  {id: number, isDone: boolean}