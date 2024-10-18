import CreateAccountFrorm from "../../components/CreateAccountForm/CreateAccountForm";
import styles from './CreateAccount.module.css'

function CreateAccount() {
  return (
    <main className={styles.createAccountPage}>
      <CreateAccountFrorm />
    </main>
  )
}

export default CreateAccount;