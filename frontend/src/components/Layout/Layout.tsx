import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from './Layout.module.css'
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AccessDenied from "../AccessDenied/AccessDenied";

function Layout() {
  const {getItem} = useLocalStorage()
  const token: string = getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || token.length < 1) {
      setTimeout(() => {
        navigate('/login')
      }, 5000)
      return
    }
  }, [])

  if (!token || token.length < 1) {
    return <AccessDenied />
  }
  
  return (
    <div className={styles.layout}>
      <Header/>
      <main className={styles.main}>
        { <Outlet/> }
      </main>
    </div>
  )
}

export default Layout