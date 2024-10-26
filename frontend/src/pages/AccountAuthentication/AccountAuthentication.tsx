import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccountVerify } from '../../utils/API';



function AccountAuthentication() {

  const token = new URLSearchParams(location.search).get('token');
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      const response = await fetchAccountVerify(token!)
      if(response.message) {
        alert("Conta verificada com sucesso")
        navigate('/login')
        return
      } else {
        alert('Erro ao confirmar conta.')
        navigate('/login')
      }
    }

    verify()
  }, [])

  return (
    <h1>Verificando...</h1>
  )
}

export default AccountAuthentication