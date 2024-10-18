import { useState } from "react"
import { fetchLogin } from "../../utils/API"
import { GiNotebook } from "react-icons/gi";
import styles from './LoginForm.module.css'
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [formInfos, setFormInfos] = useState({email: '', password: ''})
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

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
    
    const response = await fetchLogin(email, password)
    if (response.message) {
      setErrorMessage(response.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
      return;
    }
    localStorage.setItem('token', JSON.stringify(response.token))
    navigate('/')
  }


  return (
    <form className={styles.form}>
      <h1 className={styles.title}>
        <GiNotebook className={styles.noteIcon}/>
        Todo List
        </h1>
      <p className={styles.errorMsg}>{errorMessage}</p>
      <div className={styles.inputsDivs}>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          id="email"
          value={formInfos.email}
          onChange={ handleChange }
          className={styles.inputs}
          placeholder="E-mail"
        />
      </div>
      <div className={styles.inputsDivs}>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          value={formInfos.password}
          onChange={ handleChange }
          className={styles.inputs}
          placeholder="Senha"
        />
      </div>
      <div className={styles.buttonsDiv}>
        <button
          type="submit"
          onClick={handleLogin}
          className={styles.loginBtn}
        >
          Entrar
        </button>
      </div>
      <div className={styles.linksDiv}>
        <Link to={'/criar-conta'}>Criar uma conta</Link>
        <Link to={'/recuperar-conta'}>Esqueci minha senha</Link>
      </div>
    </form>
  )
}

export default LoginForm