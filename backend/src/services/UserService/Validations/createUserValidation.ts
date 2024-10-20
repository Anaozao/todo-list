import { ICreateUser } from '../../../interfaces/IUser';

const createUserValidation = (userData: ICreateUser) => {
  const { email, password, username } = userData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !password || !username) {
    return { status: 'BAD_REQUEST', message: 'Todos os campos são obrigatórios' };
  }
  if (!emailRegex.test(email)) {
    return { status: 'INVALID_VALUE', message: 'Email inválido' };
  }

  if (password.length < 6) {
    return { status: 'INVALID_VALUE', message: 'A senha deve ter no mínimo 6 caracteres' };
  }

  if (username.length < 3) {
    return {
      status: 'INVALID_VALUE',
      message: 'O nome de usuário deve ter no mínimo 3 caracteres' };
  }
  if(username.length > 10) {
    return {
      status: 'INVALID_VALUE',
      message: 'O nome de usuário deve ter no máximo 10 caracteres' };
  }
};

export default createUserValidation;
