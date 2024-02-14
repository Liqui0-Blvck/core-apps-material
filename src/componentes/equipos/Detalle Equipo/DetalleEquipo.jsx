import { useContext, useMemo, useState,} from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'


const DetalleEquipo = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: equipo, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/equipo/${id}`
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

  console.log(equipo)
  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        {
          equipo && (
            <CartDetail
              titulo='equipo'
              id_equipo={equipo.id}
              marca={equipo.marca}
              codigo = {equipo.codigo}
              procesador = {equipo.procesador}
              detalle_procesador = {equipo.detalle_procesador}
              ram = {equipo.ram}
              tipo_disco = {equipo.tipo_disco}
              capacidad_disco = {equipo.capacidad_disco}
              licencia = {equipo.licencia}
              numero_serie = {equipo.numero_serie}
              fecha_compra = {equipo.fecha_compra}
              observaciones = {equipo.observaciones}
              usuarios={equipo.usuarios}
              token={authTokens}
              fecha_creacion = {formatearFecha(equipo.fecha_creacion)}
              fecha_modificacion={formatearFecha(equipo.fecha_modificacion)}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default DetalleEquipo
