import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'


const ItemDetail = () => {
  const [data, setData] = useState([])
  
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

  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        <CartDetail
          titulo='Item'
          foto={data.foto} 
          nombre={data.nombre}
          descripcion={data.descripcion}
          fecha_creacion={formatearFecha(data.fecha_creacion)}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemDetail
