import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useNavigate } from 'react-router-dom'
import AuthContext, { useAuth } from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaUsuarios from './Tabla/TablaUsuarios'
import TableLoader from '../loaders/TableLoader'


const Usuarios = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useAuth()
  const { data: usuarios, setData, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/usuarios/?search=${clientInfo && clientInfo.isd}`
  )

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            usuarios
              ? 
                (
                  <TablaUsuarios data={datosFormateados} setData={setData} token={authTokens.access} loading={loading} setRefresh={setRefresh}/>
                )
                : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Usuarios
