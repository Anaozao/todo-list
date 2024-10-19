import { useEffect, useState } from "react"
import useLocalStorage from "../../hooks/useLocalStorage"
import { UserFromDecodedToken } from "../../types"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../../redux/reducers/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from './Header.module.css'


function Header() {

  const [username, setUsername] = useState('')
  const {getItem} = useLocalStorage()
  const token: string = getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const decodedToken: UserFromDecodedToken = jwtDecode(token)
    dispatch(setUser(decodedToken))
    setUsername(decodedToken.username)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <header
      className={styles.header}
    >
      <div></div>
      <h1>Bem vindo {username}</h1>
      <div className={styles.buttonsDiv}>
        <button
          onClick={handleLogout}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </header>
  )
}
export default Header