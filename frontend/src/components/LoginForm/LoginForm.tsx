import { useState } from "react"
import { fetchLogin } from "../../utils/API"

function LoginForm() {
  const [formInfos, setFormInfos] = useState({email: '', password: ''})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const {email, password} = formInfos
    
    const response: {token: string} = await fetchLogin(email, password)
    localStorage.setItem('token', JSON.stringify(response.token))
    console.log(response); 
  }


  return (
    <form>
      <div>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          id="email"
          value={formInfos.email}
          onChange={ handleChange }
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          value={formInfos.password}
          onChange={ handleChange }
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </form>
  )
}

export default LoginForm