import { useContext, useEffect, useMemo, useState} from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from '../contenedor/TablaContenedor'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'

const Contenedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [contenedor, setContenedor] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError('Error en la petición');
            console.log('Error en la petición');
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1500)
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
        <div className='flex justify-center mt-10'>
          <TablaContenedor data={datosFormateados} setData={setContenedor} token={authTokens.access} loading={loading}/>
        </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
