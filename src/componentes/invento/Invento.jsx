import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaEquipos from './Tabla/TablaInvento'
import TablaInvento from './Tabla/TablaInvento'


const Invento = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: inventos, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/inventos/`
  )


  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return inventos && inventos.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [inventos, formatearFecha])



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            inventos && 
            (
              <TablaInvento data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Invento
