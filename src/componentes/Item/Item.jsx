import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaItem from './TablaItem'
import { useLoaderData, useLocation } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Item = () => {
  
  const [items, setItems] = useState([])



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
      <div className='p-2'>
        <div className='flex justify-center'>
          <TablaItem data={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Item
