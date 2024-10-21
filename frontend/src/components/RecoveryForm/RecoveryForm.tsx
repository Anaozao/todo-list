import React, { useState } from "react";
import styles from './RecoveryForm.module.css'

function RecoveryForm() {

  const [formInfos, setFormInfos] = useState({email: ''})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleRequest = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <form className={styles.form}>
      <h2>Digite seu email</h2>
      <div className={styles.inputsDiv}>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formInfos.email}
          className={styles.inputs}
        />
      </div>

      <div className={styles.buttonDiv}>
        <button
          className={styles.sendButton}
          onClick={handleRequest}
        >
          Solicitar
        </button>
      </div>
    </form>
  )
}

export default RecoveryForm;