import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { useClient } from '@/context/ClientContext'
import { format } from '@formkit/tempo'


const DetalleEquipo = () => {
  const { authTokens, validToken } = useAuth()
  const { clientInfo } = useClient()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: equipo, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/equipo/${id}/?search=${clientInfo.id}`
    )

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
              usuarios = {equipo.usuarios}
              token={authTokens}
              refresh={setRefresh}
              fecha_creacion = {format(equipo.fecha_creacion, {date: 'short', time: 'short'})}
              fecha_modificacion={format(equipo.fecha_modificacion, {date: 'short', time: 'short'})}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default DetalleEquipo
