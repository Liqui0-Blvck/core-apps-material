import { useContext, useEffect, useMemo, useState} from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from '../contenedor/TablaContenedor'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'
import { useAsyncFetchGet } from '@/hooks/useFetch'

const Contenedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [contenedor, setContenedor] = useState([])

  validToken(authTokens)
  .then((res) => {
    if (!res){
      navigate('/auth/sign-in/')
    } else {
      console.log("todo bien todo correcto")
    }
  })
  .catch ((error) => {
    console.log(error)
  })
  
  useEffect(() => {
    const getContenedor = async () => {
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
      }
    }

    getContenedor()

    return () => {}
  }, [])


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
          <TablaContenedor data={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
