import React, { useContext, useEffect, useState } from 'react'
import { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import AuthContext from '@/context/AuthContext'
import { useLocation } from 'react-router-dom'
import OrdenDeCompraFormEditar from './FormularioEditar/OrdenDeCompraFormEditar'
import OrdenDeCompraFormMuestra from './FormularioMuestra/OrdenDeCompraFormMuestra'

const OrdenCompraDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [data, setData] = useState({})


  useEffect(() => {
    let isMounted = true

    if (authTokens){
      console.log("si hay token")
      const fetchData = async () => {
        try {
          const isValidToken = await validToken(authTokens)
  
          if (!isMounted) return 
  
          if (!isValidToken) {
            navigate('/auth/sign-in/');
          } else {
            const response = await fetch(`http://127.0.0.1:8000/api${pathname}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authTokens.access}`
              }
            })

            if (response.ok){
              const data = await response.json()
              setData(data)
            } else {
              console.log("Error en la petición")
            }
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
    }
  }, [authTokens])

  console.log(data)


  return (
    <MaxWidthWrapper>
      {
        data.estado_oc_label === 'Creada'
          ? (
            <>
              <OrdenDeCompraFormEditar path={pathname} />
            </>
            )
          : (
            <>
              <OrdenDeCompraFormMuestra path={pathname}/>
            </>
          )
      }
    </MaxWidthWrapper>
  )
}

export default OrdenCompraDetail

