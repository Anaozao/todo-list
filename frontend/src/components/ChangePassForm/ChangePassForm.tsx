import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassForm.module.css'
import { fetchChangePassword } from '../../utils/API';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ReactLoading from 'react-loading';

function ChangePassForm() {

  const token = new URLSearchParams(location.search).get('token');
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [formInfos, setFormInfos] = useState(
    {
      password: '',
      confirmPassword: ''
    }
  )
  const {password, confirmPassword} = formInfos

  const validateForm = () => {
    const { password, confirmPassword} = formInfos
    return (
      password.length < 6
      || confirmPassword.length < 6
      || confirmPassword !== password
    )
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleConfirm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const {password} = formInfos
    setLoading(true)
    const response = await fetchChangePassword(password, token!)
    setLoading(false)
    if (response.message !== 'Senha alterada com sucesso') {
      setMessage('Falha ao redefinir senha, tente mais tarde') 
      setInterval(() => {
        setMessage('')
        navigate('/login')
      }, 3000)
      return
    }
    setMessage('Senha redefinida com sucesso. Redirecionando ao login')
    setInterval(() => {
      navigate('/login')
    }, 3000)
    setFormInfos({password: '', confirmPassword: ''})
  }

  return (
    <form className={styles.form}>
      {loading && <ReactLoading color='black' type='bubbles' className={styles.loading}/>}
      {!loading && <p className={styles.message}>{message}</p>}
      <h1 className={styles.title}>Digite sua nova senha</h1>
      <div className={styles.inputDiv}>
        <label htmlFor="password">Nova Senha</label>
        <input
          type="password"
          onChange={handleChange}
          value={formInfos.password}
          className={styles.inputs}
          name='password'
          id='password'
        />
      </div>
      <div className={styles.inputDiv}>
        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          type="password"
          onChange={handleChange}
          value={formInfos.confirmPassword}
          className={styles.inputs}
          name='confirmPassword'
          id='confirmPassword'
        />
      </div>
      <div className={styles.buttonDiv}>
        <div className={styles.validationsDiv}>
          <p
            className={styles.validations}
          >
            {password.length < 6 ? <RxCross2/> : <FaCheck/>}A senha deve ter no mínimo 6 caracteres
          </p>
          <p
            className={styles.validations}
          >
            {confirmPassword !== password || confirmPassword.length < 6 ? <RxCross2/> : <FaCheck/>}As senhas devem ser iguais
          </p>
        </div>
        <button
          className={styles.button}
          onClick={handleConfirm}
          disabled={validateForm()}
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}

export default ChangePassForm;