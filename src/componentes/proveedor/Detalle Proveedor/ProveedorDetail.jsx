import { useContext, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import AuthContext, { useAuth } from '@/context/AuthContext'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { format } from '@formkit/tempo'


const ProveedorDetail = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: proveedor } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/proveedor/${id}`
  )

  console.log(proveedor)
  
  return (
    <MaxWidthWrapper>
      <div className='my-14'> 
        {
          proveedor && (
            <CartDetail
              titulo='Proveedor'
              foto={proveedor.foto} 
              nombre={proveedor.nombre}
              comuna={proveedor.comuna_nombre}
              direccion={proveedor.direccion}
              fecha_creacion={format(proveedor.fecha_creacion, { date: 'short' })}
              sucursales={proveedor.sucursales}
              />
          )
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ProveedorDetail
