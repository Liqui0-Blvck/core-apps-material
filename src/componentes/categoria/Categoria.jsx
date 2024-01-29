import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TransitionsModal from '../Modal'
import TablaCategorias from './TablaCategorias'
import AuthContext from '@/context/AuthContext'

const Categoria = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [categorias, setCategorias] = useState([])

  validToken(authTokens)
    .then((res) => {
      if (!res){
        navigate('/auth/sign-in/')
      } else {
        console.log("algo raro paso")
      }
    })
    .catch ((error) => {
      console.log(error)
    })


  useEffect(() => {
    const getCategoriaData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/categoria`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${authTokens.access}`
        },
        
      })

      if (response.ok){
        const data = await response.json()
        setCategorias(data)
      } else {
        console.log("Error en la petición")
      }
    }

    getCategoriaData()

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
    return categorias.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [categorias, formatearFecha])

  console.log("categoria formateada", datosFormateados)


  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex justify-center'>
        <TablaCategorias data={datosFormateados}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default Categoria
