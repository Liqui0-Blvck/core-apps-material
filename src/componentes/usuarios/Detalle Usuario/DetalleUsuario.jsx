import { useContext, useMemo, useState,} from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'


const DetalleUsuario = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: usuario, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/usuario/${id}`
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

  console.log(usuario)
  return (
    <MaxWidthWrapper>
      <div className='my-14'>
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
              fecha_modificacion={formatearFecha(usuario.fecha_modificacion)}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default DetalleUsuario
