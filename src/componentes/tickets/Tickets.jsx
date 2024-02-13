import { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useAuth } from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaTickets from './Tabla/TablaTickets'


const Tickets = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useAuth()
  const { data: tickets, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/tickets/?search=${clientInfo && clientInfo.id}`
  )


  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return tickets && tickets.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [tickets, formatearFecha])



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            tickets && 
            (
              <TablaTickets data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Tickets
