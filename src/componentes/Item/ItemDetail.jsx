import { useContext, useMemo, useState,} from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'


const ItemDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [editMode, setEditMode] = useState(false)
  const { data, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/${pathname.slice(5)}`
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


  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        {
          data && (
            <CartDetail
              titulo='Item'
              foto={data.foto} 
              nombre={data.nombre}
              descripcion={data.descripcion}
              fecha_creacion={formatearFecha(data.fecha_creacion)}
              proveedores={data.proveedores}
              editMode={setEditMode}
              editable={editMode}
              token={authTokens}
              fecha_modificacion={formatearFecha(data.fecha_modificacion)}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemDetail
