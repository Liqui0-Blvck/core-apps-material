import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaEquipos from './Tabla/TablaEquipos'


const Equipos = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: equipos, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/equipos/?search=${clientInfo && clientInfo.id}`
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
    return equipos && equipos.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [equipos, formatearFecha])



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            equipos 
              ? (
                  <TablaEquipos data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
                )
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Equipos
