import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassForm.module.css'

function ChangePassForm() {

  const token = new URLSearchParams(location.search).get('token');
  const navigate = useNavigate()

  const [formInfos, setFormInfos] = useState(
    {
      password: '',
      confirmPassword: ''
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  return (
    <form>
      <div className={styles.inputDiv}>
        <label htmlFor="password"></label>
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
        <label htmlFor="confirmPassword"></label>
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
        <button
          className={styles.button}
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}

export default ChangePassForm;