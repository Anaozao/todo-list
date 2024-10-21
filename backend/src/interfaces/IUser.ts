export default interface IUser {
  id: number,
  email: string,
  username: string,
  password: string,
  isActive: boolean
}

export interface IUserWithoutPass {
  id: number,
  email: string,
  username: string,
}

export interface ICreateUser {
  email: string,
  username: string,
  password: string,
}

export type ICreatedUser = Omit<IUser, 'password'>;
