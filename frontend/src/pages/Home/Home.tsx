import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import JwtUtils from '../../utils/JWT'

function Home() {
  const [user, setUser] = useState('teste')
  const navigate = useNavigate()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '')
    if (!token) {
      setTimeout(() => {
        alert('Você precisa estar logado para acessar esta página')
      })
      navigate('/login')
    }
    const username = new JwtUtils().decodeToken(token)
    console.log(username)

  }, [])

  return (
    <div className={styles.homePage}>
      <header
        className={styles.header}
      >
        <h1>Bem vindo {user}</h1>
      </header>
    </div>
  )
}

export default Home