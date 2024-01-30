import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'


const ContenedorDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [data, setData] = useState({})
  const { pathname } = useLocation()

  useEffect(() => {
    let isMounted = true

    if (authTokens){
      console.log("si hay token")
      const fetchData = async () => {
        try {
          const isValidToken = await validToken(authTokens)
  
          if (!isMounted) return 
  
          if (!isValidToken) {
            navigate('/auth/sign-in/');
          } else {
            const response = await fetch(`http://127.0.0.1:8000/api${pathname}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
              }

            })

            if (response.ok){
              console.log("se hizo ")
              const data = await response.json()
              setData(data)
            } else {
              console.log("alguna cosa mal hiciste")
            }
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
    }
  }, [authTokens])



  
  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      })
    },
    []
  )


  return (
    <MaxWidthWrapper>
      <CartDetail
        foto={data.foto} 
        nombre={data.nombre} 
        codigo={data.codigo}
        color={data.color}
        dimensiones={data.dimensiones}
        estado={data.estado}
        fecha_creacion={formatearFecha(data.fecha_creacion)}/>
    </MaxWidthWrapper>
  )
}

export default ContenedorDetail
