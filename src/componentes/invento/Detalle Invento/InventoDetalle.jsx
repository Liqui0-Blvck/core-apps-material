import { useContext, useMemo, useState, } from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'


const InventoDetalle = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: invento, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/invento/${id}`
  )

  console.log(id)


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

  console.log(invento)


  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        {
          invento && (
            <CartDetail
              titulo='Item'
              nombre={invento.nombre}
              descripcion={invento.descripcion}
              fecha_creacion={formatearFecha(invento.fecha_creacion)}
              items={invento.items}
              fecha_modificacion={formatearFecha(invento.fecha_modificacion)}
            />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default InventoDetalle
