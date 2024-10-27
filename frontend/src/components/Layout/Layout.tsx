import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from './Layout.module.css'
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AccessDenied from "../AccessDenied/AccessDenied";
import { fetchUser } from "../../utils/API";
import { UserFromDecodedToken } from "../../types";
import { jwtDecode } from "jwt-decode";

function Layout() {
  const {getItem} = useLocalStorage()
  const token: string = getItem('token')
  const navigate = useNavigate()
  const [isValidUser, setIsValidUser] = useState(false)

  
  useEffect(() => {
    const getUser = async () => {
      const {id}: UserFromDecodedToken = jwtDecode(token)
      const response = await fetchUser(id, token)
      if (response.message) {
        setIsValidUser(false)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
        return 
      }
      setIsValidUser(true)
    }
    if (!token || token.length < 1) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      return
    }
    if (token && token.length > 1) {
      getUser()
      return
    }
  }, [token])

  if (!token || token.length < 1 ) {
    return <AccessDenied />
  }
  
  return (
    
    <div className={styles.layout}>
      {isValidUser ? (
        <>
          <Header/>
          <main className={styles.main}>
            { <Outlet/> }
          </main>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
      
    </div>
  )
}

export default Layout