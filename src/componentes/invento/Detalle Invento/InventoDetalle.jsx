import { useContext, useMemo, useState, } from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import { format } from '@formkit/tempo'


const InventoDetalle = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: invento, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/invento/${id}`
  )


  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        {
          invento && (
            <CartDetail
              titulo='Item'
              nombre={invento.nombre}
              descripcion={invento.descripcion}
              fecha_creacion={format(invento.fecha_creacion, { date: 'short', time: 'short' })}
              items={invento.items}
              fecha_modificacion={format(invento.fecha_modificacion, { date: 'short', time: 'short' })}
            />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default InventoDetalle
