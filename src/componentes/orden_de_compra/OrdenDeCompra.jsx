import { useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaOrdenDeCompra from './TablaOrdenDeCompra'
import { useLoaderData } from 'react-router-dom'

const OrdenDeCompra = () => {
  const { data } = useLoaderData()
  const [ordenDeCompra, setOrdenDeCompra] = useState(data)

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

  return (
    <MaxWidthWrapper>
      <div className='mt-5 p-2'>
        <div className='flex justify-center'>
          <TablaOrdenDeCompra data={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default OrdenDeCompra
