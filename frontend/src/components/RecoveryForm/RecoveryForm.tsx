import React, { useState } from "react";
import styles from './RecoveryForm.module.css'
import { fetchRecoveryAccount } from "../../utils/API";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

function RecoveryForm() {

  const [formInfos, setFormInfos] = useState({email: ''})
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
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

  const handleSend = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {email} = formInfos
    if (!emailRegex.test(email)) {
      setMessage('Digite um email válido')
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
        setMessage('')
      }, 5000);
      return
    }
    setLoading(true)
    await fetchRecoveryAccount(email)
    setLoading(false)
    setMessage('Link para alteração de senha enviado ao seu e-mail. Redirecionando para o login')
    setShowMessage(true)
    setTimeout(() => {
      setMessage('')
      setShowMessage(false)
      navigate('/login')
    }, 5000);
  }

  return (
    <form className={styles.form}>
      {loading && <ReactLoading color="black" type="bubbles" className={styles.loading}/>}
      {showMessage && <p className={styles.message}>{message}</p>}
      <p className={styles.title}>Digite seu email</p>
      <div className={styles.inputDiv}>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formInfos.email}
          className={styles.inputs}
        />
      </div>
      <div className={styles.buttonDiv}>
        <button
          onClick={handleSend}
          className={styles.buttons}
        >
          Confirmar
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={styles.buttons}
        >
          Voltar
        </button>
      </div>
    </form>
  )
}

export default RecoveryForm;