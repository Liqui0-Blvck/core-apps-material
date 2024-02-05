import React, { useContext, useEffect, useState } from 'react'
import { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useLocation } from 'react-router-dom'
import OrdenDeCompraFormEditar from './FormularioEditar/OrdenDeCompraFormEditar'
import OrdenDeCompraFormMuestra from './FormularioMuestra/OrdenDeCompraFormMuestra'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const OrdenCompraDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/${id}`
  ) 

  return (
    <MaxWidthWrapper>
      {
        data && data.estado_oc_label === 'Creada'
          ? (
            <>
              <OrdenDeCompraFormEditar data={data}/>
            </>
            )
          : (
            <>
              {/* <OrdenDeCompraFormMuestra data={data}/> */}
            </>
          )
      }
    </MaxWidthWrapper>
  )
}

export default OrdenCompraDetail

