import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaItem from './TablaItem'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'


const ItemList = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  validToken(authTokens)
    .then((res) => {
      if (!res){
        navigate('/auth/sign-in/')
      } else {
        // setItems(data)
      }
    })
    .catch ((error) => {
      console.log(error)
    })

  useEffect(() => {
    const getItemData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/item/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization':  `Bearer ${authTokens.access}`
        }
      })

      if (response.ok){
        const data = await response.json()
        setItems(data)
      } else {
        console.log("Error en la petición")
      }
    }


    getItemData()

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
    return items.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [items, formatearFecha])

  return (
    <MaxWidthWrapper>
      <div className='mt-5 p-2 mb-[45%]'>
        <div className='flex justify-center '>
          <TablaItem datos={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemList
