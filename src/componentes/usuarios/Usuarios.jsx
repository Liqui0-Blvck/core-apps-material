import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaUsuarios from './Tabla/TablaUsuarios'


const Usuarios = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: usuarios, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/usuarios/?search=${clientInfo && clientInfo.id}`
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
    return usuarios && usuarios.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [usuarios, formatearFecha])



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            usuarios && 
            (
              <TablaUsuarios data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Usuarios
