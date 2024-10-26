import { useEffect } from 'react'
import styles from './Home.module.css'
import { useDispatch } from 'react-redux'
import { TaskType, UserFromDecodedToken } from '../../types'
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from '../../hooks/useLocalStorage'
import TasksSection from '../../components/TasksSection/TasksSection'
import { fetchGetTasks } from '../../utils/API'
import { setTasks } from '../../redux/reducers/tasksSlice'
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm'
import { setLoading } from '../../redux/reducers/loadingSlice'


function Home() {
  const dispatch = useDispatch()
  const {getItem} = useLocalStorage()
  const token: string = getItem('token')
  
  useEffect(() => {
    const decodedToken: UserFromDecodedToken = jwtDecode(token)
    const getTasks = async () => {
      dispatch(setLoading(true))
      const response: TaskType[] = await fetchGetTasks(decodedToken.id, token)
      dispatch(setLoading(false))
      dispatch(setTasks(response))
    }
    getTasks()

  }, [])

  return (
    <section className={styles.homePage}>
      <div className={styles.main}>
        <CreateTaskForm />
        <h1 className={styles.title}>Suas tarefas:</h1>
        <TasksSection />
      </div>
    </section>
  )
}

export default Home