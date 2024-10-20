import React, { useState } from 'react'
import { TaskType, UserFromDecodedToken } from '../../types'
import { fetchCreateTask, fetchGetTasks } from '../../utils/API'
import styles from './CreateTaskForm.module.css'
import { jwtDecode } from 'jwt-decode'
import {setTasks} from '../../redux/reducers/tasksSlice'
import { useDispatch } from 'react-redux'

function CreateTaskForm() {
  const token = JSON.parse(localStorage.getItem('token') || '[]')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')

  const getUserId = () => {
    const decode: UserFromDecodedToken = jwtDecode(token)
    const userId = decode.id
    return userId
  }

  const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(description.length < 5) {
      setErrorMessage('Mínimo de 5 caracteres')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      
      return
    }
    const newTask = {
      userId: getUserId(),
      description,
    }

    await fetchCreateTask(newTask, token)
    setDescription('')

    const getTasks = async () => {
      const decodedToken: UserFromDecodedToken = jwtDecode(token)
      const response: TaskType[] = await fetchGetTasks(decodedToken.id, token)
      
      dispatch(setTasks(response))
      
    }
    getTasks()


  }


  return (
    <form className={styles.taskForm}>
      <div className={styles.inputDiv}>
        <label htmlFor="description"></label>
        <input
          type="text"
          name='description'
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Novo item...'
          className={styles.inputs}
        />
      </div>
      <div className={styles.buttonDiv}>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button
          onClick={handleCreate}
          className={styles.addButton}
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}

export default CreateTaskForm;