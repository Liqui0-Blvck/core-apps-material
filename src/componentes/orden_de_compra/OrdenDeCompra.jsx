import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaOrdenDeCompra from './TablaOrdenDeCompra'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const OrdenDeCompra = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [ordenDeCompra, setOrdenDeCompra] = useState([])
  const navigate = useNavigate()

  validToken(authTokens)
  .then((res) => {
    if (!res){
      navigate('/auth/sign-in/')
    } else {
    }
  })
  .catch ((error) => {
    console.log(error)
  })

  useEffect(() => {
    const getOrdenesDeCompraData = async () => {
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

    getOrdenesDeCompraData()


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
    return ordenDeCompra.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [ordenDeCompra, formatearFecha])

  console.log(datosFormateados)

  return (
    <div className='px-5'>
      <div className='mt-5 p-2 mb-[45%]'>
        <div className='flex justify-center'>
          <TablaOrdenDeCompra data={datosFormateados} />
        </div>
      </div>
    </div>
  )
}

export default OrdenDeCompra
