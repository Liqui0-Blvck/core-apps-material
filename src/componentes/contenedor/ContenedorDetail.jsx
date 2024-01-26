import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'


const ContenedorDetail = () => {

  const { data } = useLoaderData()
  
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
      <CartDetail
        foto={data.foto} 
        nombre={data.nombre} 
        codigo={data.codigo}
        color={data.color}
        dimensiones={data.dimensiones}
        estado={data.estado}
        fecha_creacion={formatearFecha(data.fecha_creacion)}/>
    </MaxWidthWrapper>
  )
}

export default ContenedorDetail
