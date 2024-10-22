
import RecoveryForm from '../../components/RecoveryForm/RecoveryForm';
import styles from './AccountRevocery.module.css'

function AccountRecovery() {
  return (
    <main className={styles.recoveryPage}>
      <h1 className={styles.title}>Recuperação de conta</h1>
      <RecoveryForm />
    </main>
  )
}

export default AccountRecovery;