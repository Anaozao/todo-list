import { useEffect, useState } from "react";
import { TaskType } from "../../types"
import styles from './TaskCard.module.css'
import { fetchUpdataTask } from "../../utils/API";
import useLocalStorage from "../../hooks/useLocalStorage";

function TaskCard({description, createdAt, isDone, id}: TaskType) {
  const [checked, setChecked] = useState(false);
  const {getItem} = useLocalStorage()
  const token = getItem('token')


  
  const formatDate = () => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    setChecked(isDone)
  }, [])

  const handleCheck = async () => {
    setChecked(!checked)
    const payload = {
      id,
      isDone: !isDone
    }
    const response = await fetchUpdataTask(payload, token)
    console.log(response);
    
  }

  return (
    <div className={styles.taskCard}>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <div className={styles.textDiv}>
        <p className={styles.description}>Descriçao: {description}</p>
        <p className={styles.createdAt}>Criado em: {formatDate()}</p>
      </div>
    </div>
  )
}

export default TaskCard;