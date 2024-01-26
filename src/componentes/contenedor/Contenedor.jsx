import { useMemo, useState} from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from '../contenedor/TablaContenedor'
import { useLoaderData } from 'react-router-dom'

const Contenedor = () => {
  const { data } = useLoaderData()
  const [contenedor, setContenedor] = useState(data)

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
    return contenedor.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [contenedor, formatearFecha])

  console.log(datosFormateados)

  return (
    <MaxWidthWrapper>
      <div className='mt-5 p-2 '>
        <div className='flex justify-center'>
          <TablaContenedor data={datosFormateados} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
