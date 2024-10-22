import React, { useState } from "react";
import styles from './RecoveryForm.module.css'
import { fetchRecoveryAccount } from "../../utils/API";

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

  const handleSend = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {email} = formInfos
    const response = await fetchRecoveryAccount(email)
    console.log(response)
  }

  return (
    <form>
        <div>
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
        <div>
          <button
            onClick={handleSend}
          >
            Confirmar
          </button>
        </div>
      </form>
  )
}

export default RecoveryForm;