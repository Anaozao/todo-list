import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TaskType, UserFromDecodedToken } from '../../types'
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from '../../hooks/useLocalStorage'
import AccessDenied from '../../components/AccessDenied/AccessDenied'
import TasksSection from '../../components/TasksSection/TasksSection'
import { fetchGetTasks } from '../../utils/API'
import { setTasks } from '../../redux/reducers/tasksSlice'
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm'


function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {getItem} = useLocalStorage()
  const [accessDenied, setAccessDenied] = useState(false)
  const token: string = getItem('token')
  
  useEffect(() => {
    const decodedToken: UserFromDecodedToken = jwtDecode(token)
    
    if (!token || token.length < 1) {
      setAccessDenied(true)
      setTimeout(() => {
        setAccessDenied(false)
        navigate('/login')
      }, 5000)
      return
    }
    const getTasks = async () => {
      const response: TaskType[] = await fetchGetTasks(decodedToken.id, token)
      dispatch(setTasks(response))
    }
    getTasks()

  }, [])

  if (accessDenied) {
    return <AccessDenied />
  }

  return (
    <section className={styles.homePage}>
      <h1 className={styles.title}>Suas tarefas</h1>
      <div className={styles.main}>
        <CreateTaskForm />
        <TasksSection />
      </div>
    </section>
  )
}

export default Home