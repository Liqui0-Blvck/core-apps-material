import { useContext, useEffect, useMemo, useState} from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from '../contenedor/TablaContenedor'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'

const Contenedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [contenedor, setContenedor] = useState([])

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
            const response = await fetch('http://127.0.0.1:8000/api/contenedor/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authTokens.access}`
              }
            })

            if (response.ok){
              const data = await response.json()
              setContenedor(data)
            } else {
              console.log("Error en la peticion")
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

  const datosFormateados = useMemo(() => {
    return contenedor.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [contenedor, formatearFecha])


  return (
    <MaxWidthWrapper>
      <div className='mt-5 p-2 mb-[45%]'>
        <div className='flex justify-center'>
          <TablaContenedor data={datosFormateados} setData={setContenedor} token={authTokens.access}/>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
