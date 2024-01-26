import { useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaProveedor from './TablaProveedor'
import { useLoaderData } from 'react-router-dom'

const Item = () => {
  const { data } = useLoaderData()
  const [proveedor, setItems] = useState(data)

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

  return (
    <MaxWidthWrapper>
      <div className='mt-5 p-2'>
        <div className='flex justify-center'>
          <TablaProveedor data={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Item
