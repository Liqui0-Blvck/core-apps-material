import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'


const DetalleUsuario = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: usuario, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/usuario/${id}`
    )


  return (
    <MaxWidthWrapper>
      <div>
        {
          usuario && (
            <CartDetail
              titulo='Usuario'
              id={usuario.id}
              nombre={usuario.nombre}
              apellido={usuario.apellido}
              fecha_creacion={formatearFecha(usuario.fecha_creacion)}
              correo={usuario.correo}
              departamento={usuario.departamento}
              token={authTokens}
              fecha_modificacion={format(usuario.fecha_modificacion, { date: 'short', time: 'short' })}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default DetalleUsuario
