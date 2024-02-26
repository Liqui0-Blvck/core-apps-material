import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import HeaderDetalleOrdenDeCompra from './HeaderDetalleOrdenDeCompra'
import FooterDetalleOrdenDeCompra from './FooterDetalleOrdenDeCompra'


const DetalleOrdenDeCompra = ({ data }) => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)

  const { data: orden_compra } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/orden-compra/${id}`
  )

  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/items/`
  )
 
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let isMounted = true

    if (orden_compra && isMounted){
      setRows(orden_compra.items)
    }
  }, [orden_compra])


  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-10 p-2'>
        <HeaderDetalleOrdenDeCompra 
          ordenCompra={orden_compra}
        />
        <div id='form-list' className='mt-10'>
          <FooterDetalleOrdenDeCompra
            ordenCompra={orden_compra}
            rows={rows}
            itemProveedor={items} 
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default DetalleOrdenDeCompra
