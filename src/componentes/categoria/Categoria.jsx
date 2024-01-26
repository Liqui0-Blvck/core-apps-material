import { useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TransitionsModal from '../Modal'
import { useLoaderData } from 'react-router-dom'
import TablaCategorias from './TablaCategorias'

const Item = () => {
  const { data } = useLoaderData()
  const [categorias, setCategorias] = useState(data)

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

  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex justify-center'>
        <TablaCategorias data={datosFormateados}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default Item
