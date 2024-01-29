import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaProveedor from './TablaProveedor'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'

const Proveedor = () => {
  const { authTokens, validToken } = useContext(AuthContext) 
  const [proveedor, setProveedor] = useState([])

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
    const getProveedorData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/proveedor/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization':  `Bearer ${authTokens.access}`
        }
      })

      if (response.ok){
        const data = await response.json()
        setProveedor(data)
      } else {
        console.log("Error en la petición")
      }
    }

    getProveedorData()


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
    return proveedor.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [proveedor, formatearFecha])

  console.log(datosFormateados)

  return (
    <div className='px-5'>
      <div className='mt-5 p-2 mb-[45%]'>
        <div className='flex justify-center mx-auto'>
          <TablaProveedor data={datosFormateados} />
        </div>
      </div>
    </div>
  )
}

export default Proveedor
