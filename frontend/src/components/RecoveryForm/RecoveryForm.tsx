import React, { useState } from "react";
import styles from './RecoveryForm.module.css'
import { fetchRecoveryAccount } from "../../utils/API";
import { useNavigate } from "react-router-dom";

function RecoveryForm() {

  const [formInfos, setFormInfos] = useState({email: ''})
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()

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
    await fetchRecoveryAccount(email)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      navigate('/login')
    }, 5000);

  }

  return (
    <form className={styles.form}>
      {showMessage && <p className={styles.message}>Link para alteração de senha enviado ao seu e-mail</p>}
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
          className={styles.sendBtn}
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}

export default RecoveryForm;