import { useEffect, useState } from "react";
import { ReduxState, TaskType } from "../../types"
import styles from './TaskCard.module.css'
import { fetchDeleteTask, fetchUpdataTask } from "../../utils/API";
import useLocalStorage from "../../hooks/useLocalStorage";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/reducers/tasksSlice";

function TaskCard({description, createdAt, isDone, id}: TaskType) {
  const [checked, setChecked] = useState(false);
  const {getItem} = useLocalStorage()
  const [deletePopup, setDeletePopup] = useState(false)
  const token = getItem('token')
  const dispatch = useDispatch()
  const {allTasks} = useSelector((state: ReduxState) => state.tasks)
  
  
  
  const formatDate = () => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
    await fetchUpdataTask(payload, token)
    
  }

  const handlePopup = () => {
    setDeletePopup(true)
  }

  const handleDelete = async () => {
    await fetchDeleteTask(id, token)
    setDeletePopup(false)
    const newTasks = allTasks.filter((t) => t.id !== id)
    dispatch(setTasks(newTasks))
  }

  return (
    <div className={styles.taskCard}>
      <div className={styles.buttonsDiv}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          className={styles.checkBox}
        />
        
      </div>
      <div className={styles.textDiv}>
        <p className={styles.description}
        >
          <span
            className={styles.span}
          >Descriçao:</span> {description}
        </p>
        <p className={styles.createdAt}
        >
          <span
            className={styles.span}
          >Criado em:</span> {formatDate()}
        </p>
      </div>
      <button
        className={styles.deletBtn}
        onClick={handlePopup}
      >
        {<RxCross2 className={styles.deletIcon}/>}
      </button>
      {deletePopup && (
        <>
          <div className={styles.popupPage}>
            <div className={styles.popup}>
              <p className={styles.text}
              >
                Tem certeza que deseja excluir o item?
              </p>
              <div className={styles.popupButtonsDiv}>
                <button
                  onClick={() => setDeletePopup(false)}
                  className={styles.buttons}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className={styles.buttons}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskCard;