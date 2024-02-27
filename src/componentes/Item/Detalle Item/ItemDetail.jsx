import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import { format } from '@formkit/tempo'



const ItemDetail = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/item/${id}`
    )

  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        {
          data && (
            <CartDetail
              titulo='Item'
              marca={data.marca}
              id={data.id}
              foto={data.foto} 
              nombre={data.nombre}
              descripcion={data.descripcion}
              fecha_creacion={format(data.fecha_creacion, { date: 'short', time: 'short' })}
              proveedores={data.proveedores}
              token={authTokens}
              fecha_modificacion={format(data.fecha_modificacion, { date: 'short', time: 'short' })}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemDetail
