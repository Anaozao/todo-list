export type LoginResponse = { token: string} | { message: string}

export type CreateAccountData = {
  email: string,
  username: string,
  password: string
}