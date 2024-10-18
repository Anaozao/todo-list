import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TaskType, UserFromDecodedToken } from '../../types'
import { jwtDecode } from 'jwt-decode'
import { setUser } from '../../redux/reducers/userSlice'
import useLocalStorage from '../../hooks/useLocalStorage'
import AccessDenied from '../../components/AccessDenied/AccessDenied'
import TasksSection from '../../components/TasksSection/TasksSection'
import { fetchGetTasks } from '../../utils/API'
import { setTasks } from '../../redux/reducers/tasksSlice'
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm'


function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const {getItem} = useLocalStorage()
  const [accessDenied, setAccessDenied] = useState(false)
  const token: string = getItem('token')
  
  useEffect(() => {
    
    if (!token || token.length < 1) {
      setAccessDenied(true)
      setTimeout(() => {
        setAccessDenied(false)
        navigate('/login')
      }, 5000)
      return
    }
    const decodedToken: UserFromDecodedToken = jwtDecode(token)
    dispatch(setUser(decodedToken))
    setUsername(decodedToken.username)

    const getTasks = async () => {
      const decodedToken: UserFromDecodedToken = jwtDecode(token)
      const response: TaskType[] = await fetchGetTasks(decodedToken.id, token)
      
      dispatch(setTasks(response))
      
    }
    getTasks()

  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (accessDenied) {
    return <AccessDenied />
  }

  return (
    <div className={styles.homePage}>
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
      <main className={styles.main}>
        <CreateTaskForm />
        <TasksSection />
      </main>
    </div>
  )
}

export default Home