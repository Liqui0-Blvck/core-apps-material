import { useMemo, useState } from 'react'

export const useFormatoFecha = ({ data }) => {
  const [result, setResult] = useState([])
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
    return data.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [data, formatearFecha])

  setResult(datosFormateados)

  return { result }
}