import { useContext, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'


const ItemDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [data, setData] = useState({})


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
                'authorization': `Bearer ${authTokens.access}`
              }
            })

            if (response.ok){
              const data = await response.json()
              setData(data)
            } else {
              console.log("Error en la petición")
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

  console.log(data)
  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        <CartDetail
          titulo='Item'
          foto={data.foto} 
          nombre={data.nombre}
          descripcion={data.descripcion}
          fecha_creacion={formatearFecha(data.fecha_creacion)}
          proveedores={data.proveedores}
          />
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemDetail
