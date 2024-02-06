import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import ItemOrdenForm from './ItemOrdenForm'
import toast from 'react-hot-toast'
import FormHeader from './FormHeader'
import { useFormik } from 'formik'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'


const OrdenDeCompraFormMuestra = ({ data }) => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)

  const { data: orden_compra } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/${id}`
  )

  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/item/`
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
        <FormHeader 
          ordenCompra={orden_compra}
        />
        <div id='form-list' className='mt-10'>
          <ItemOrdenForm
            ordenCompra={orden_compra}
            rows={rows}
            itemProveedor={items} 
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrdenDeCompraFormMuestra
