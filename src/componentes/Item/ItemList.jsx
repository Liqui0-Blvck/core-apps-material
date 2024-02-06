import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaItem from './TablaItem'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'


const ItemList = () => {
  const { authTokens, validToken } = useContext(AuthContext)
 const { data: items, setData, loading } = useAuthenticatedFetch(
  authTokens,
  validToken,
  `http://127.0.0.1:8000/api/item/`
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
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return items && items.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [items, formatearFecha])



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            items && (
              <TablaItem data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ItemList
