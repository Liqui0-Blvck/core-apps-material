import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import { format } from '@formkit/tempo'



const ContenedorDetail = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: contenedor, setRefresh} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/contenedor/${id}/`
  )

  return (
    <MaxWidthWrapper>
      {
        contenedor && (
          <CartDetail
            titulo='Contenedor'
            refresh={setRefresh}
            id={contenedor.id}
            foto={contenedor.foto} 
            nombre={contenedor.nombre} 
            codigo={contenedor.codigo}
            color={contenedor.color}
            items={contenedor.items}
            espacios={contenedor.espacios_contenedor}
            fecha_modificacion={format(contenedor.fecha_creacion, { date: 'short', time: 'short'})}
            dimensiones={contenedor.dimensiones}
            estado={contenedor.estado}
            tipo={contenedor.tipo}
            fecha_creacion={format(contenedor.fecha_creacion, { date: 'short', time: 'short'})} 
            />
        )
      }
    </MaxWidthWrapper>
  )
}

export default ContenedorDetail
