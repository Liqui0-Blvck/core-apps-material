import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaOrdenDeCompra from './TablaOrdenDeCompra'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const OrdenDeCompra = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [ordenDeCompra, setOrdenDeCompra] = useState([])
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()

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
            const response = await fetch(`http://127.0.0.1:8000/api/orden-compra/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization':  `Bearer ${authTokens.access}`
              }
            })

            if (response.ok){
              console.log(response)
              const data = await response.json()
              setOrdenDeCompra(data)
            } else {
              console.log("Error en la petición")
            }
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()

      if (refresh){
        fetchData()
      }
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
      setRefresh(false)
    }
  }, [authTokens, refresh])


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

  const datosFormateados = useMemo(() => {
    return ordenDeCompra.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [ordenDeCompra, formatearFecha])


  return (
    <div className='px-5'>
      <div className='mt-5 p-2 mb-[45%]'>
        <div className='flex justify-center'>
          <TablaOrdenDeCompra data={datosFormateados} setData={setOrdenDeCompra} token={authTokens.access} setRefresh={setRefresh}/>
        </div>
      </div>
    </div>
  )
}

export default OrdenDeCompra
