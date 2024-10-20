import { fetchDeleteTask } from "../../utils/API";
import styles from './DeletePopup.module.css'

type DeletePopupProps = {
  id: number,
  token: string
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>
}



function DeletePopup({id, token, setDeletePopup}: DeletePopupProps) {

  const handleDelete = async () => {
    await fetchDeleteTask(id, token)
    setDeletePopup(false)
  }

  return (
    <div className={styles.popupPage}>
      <div className={styles.popup}>
        <p className={styles.text}
        >
          Tem certeza que deseja excluir o item?
        </p>
        <div className={styles.buttonsDiv}>
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
  )
}

export default DeletePopup;