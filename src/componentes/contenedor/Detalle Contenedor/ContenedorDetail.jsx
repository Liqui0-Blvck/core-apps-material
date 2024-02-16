import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'


const ContenedorDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data, loading, setRefresh} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://localhost:8000/api/contenedor/${id}/`
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

  return (
    <MaxWidthWrapper>
      {
        data && (
          <CartDetail
            titulo='Contenedor'
            refresh={setRefresh}
            id={data.id}
            foto={data.foto} 
            nombre={data.nombre} 
            codigo={data.codigo}
            color={data.color}
            items={data.items}
            espacios={data.espacios_contenedor}
            fecha_modificacion={formatearFecha(data.fecha_creacion)}
            dimensiones={data.dimensiones}
            estado={data.estado}
            tipo={data.tipo}
            fecha_creacion={formatearFecha(data.fecha_creacion)}/>
        )
      }
    </MaxWidthWrapper>
  )
}

export default ContenedorDetail
