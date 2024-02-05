import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TransitionsModal from '../Modal'
import TablaCategorias from './TablaCategorias'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const Categoria = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: categorias, setData, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/categoria/`
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
        hour12: false
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return categorias && categorias.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [categorias, formatearFecha])

  
  return (
    <MaxWidthWrapper>
      <div className='flex justify-center'>
        {
          categorias && (
            <TablaCategorias data={datosFormateados} setData={setData} token={authTokens.access} setRefresh={setRefresh}/>
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default Categoria
