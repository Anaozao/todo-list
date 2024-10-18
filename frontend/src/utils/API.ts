import { CreateAccountData, CreateTask } from "../types";

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

export const fetchGetTasks = async (userId: number, token: string) => {
  
  try {
    const response = await fetch(`${baseUrl}/tasks/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
  
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}

export const fetchCreateTask = async ({userId, description}: CreateTask, token: string) => {
  
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        description
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
  
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}