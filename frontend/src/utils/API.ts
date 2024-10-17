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