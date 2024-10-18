import LoginForm from "../../components/LoginForm/LoginForm";
import styles from './Login.module.css'

function Login() {
  return (
    <main className={styles.loginPage}>
      <LoginForm />
    </main>
  )
}

export default Login