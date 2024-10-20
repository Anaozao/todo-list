import React, { useState } from "react";
import styles from './CreateAccountForm.module.css'
import { fetchCreateAccount } from "../../utils/API";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function CreateAccountFrorm() {
  const [formInfos, setFormInfos] = useState(
    {
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    })

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const validateNewAccount = () => {
    const {confirmPassword, email, password, username} = formInfos
    return (
      !emailRegex.test(email)
      || username.length < 3
      || password.length < 6
      || confirmPassword.length < 6
    )
  }


  const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const {email, username, password } = formInfos
    const response = await fetchCreateAccount({email, password, username})
    if(response.message) {
      setErrorMessage(response.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
      return
    }
    setErrorMessage('Conta criada com sucesso. Redirecionando para o Login')
    setTimeout(() => {
      setErrorMessage('')
      navigate('/login')
    }, 3000)
  }

  return (
    <form className={styles.form}>
      <p
        className={errorMessage.includes('sucesso') ? styles.successMsg : styles.errorMsg}
      >
        {errorMessage}
      </p>
      <p className={styles.title}>Criar Conta</p>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          placeholder="E-mail"
          value={formInfos.email}
          name="email"
          onChange={handleChange}
          className={styles.inputs}
          id="email"
        />
      </div>
      <div>
        <label htmlFor="username"></label>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={formInfos.username}
          name="username"
          onChange={handleChange}
          className={styles.inputs}
          id="username"
          maxLength={10}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          placeholder="Senha"
          value={formInfos.password}
          name="password"
          onChange={handleChange}
          className={styles.inputs}
          id="password"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={formInfos.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          className={styles.inputs}
          id="confirmPassword"
        />
      </div>
      <div>
        <p>
          {emailRegex.test(formInfos.email) ? <FaCheck /> : <RxCross2 />}
          O email deve estar em um formato válido
        </p>
        <p
        >
          {formInfos.username.length < 3 ? <RxCross2 /> : <FaCheck />}
          O nome de usuário deve ter no mínimo 3 caracteres
        </p>
        <p
        >
          {formInfos.password.length < 6 ? <RxCross2 /> : <FaCheck />}
          A senha deve ter no mínimo 6 caracteres
        </p>
        <p
        >
          {
            (formInfos.confirmPassword.length < 6 || formInfos.password !== formInfos.confirmPassword)
            ? <RxCross2 /> : <FaCheck />
          }
          A senha e a confirmação de senha devem ser iguais
        </p>
      </div>
      <div className={styles.buttonsDiv}>
        <button
          onClick={handleCreate}
          className={styles.buttons}
          disabled={ validateNewAccount() }
        >
          Criar Conta
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={styles.buttons}
        >
          Voltar ao Login
        </button>
      </div>
    </form>
  )
}

export default CreateAccountFrorm;