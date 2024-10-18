import { CreateAccountData } from "../types";

const baseUrl = import.meta.env.VITE_BACK_URL

export const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {'Content-type': 'application/json'}
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}

export const fetchCreateAccount = async ({email, password, username}: CreateAccountData) => {
  console.log('entrou no fetch');
  
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        username,
        password
      }),
      headers: {'Content-type': 'application/json'}
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}