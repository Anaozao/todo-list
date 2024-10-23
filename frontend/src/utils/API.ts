import { CreateAccountData, CreateTask, UpdateTask } from "../types";

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

export const fetchUpdataTask = async ({id, isDone}: UpdateTask, token: string) => {
  
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isDone
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


export const fetchDeleteTask = async (id: number, token: string) => {
  
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
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

export const fetchUser = async (id: number, token: string) => {

  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
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

export const fetchAccountVerify = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/verify-email?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}

export const fetchRecoveryAccount = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/recovery-account`, {
      method: 'POST',
      body: JSON.stringify({
        email
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}

export const fetchChangePassword = async (password: string, token: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/change-password`, {
      method: 'POST',
      body: JSON.stringify({
        password,
        token
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = response.json();
    
    return data
  }catch (e) {
    console.error(e)
  }
}