import React, { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaGuiaDeSalida from './Tabla/TablaGuiaDeSalida'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const GuiaDeSalida = () => {
  const { authTokens, validToken } = useAuth()
  const { data: guia_salida, setData, setRefresh} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/guia_salidas/`
  ) 

   return (
    <MaxWidthWrapper>
        {
          guia_salida && (
            <div className='flex justify-center mt-10'>
              <TablaGuiaDeSalida data={guia_salida} setData={setData} token={authTokens.access} setRefresh={setRefresh}/>
            </div>
          )
        }
    </MaxWidthWrapper>
  )
}

export default GuiaDeSalida
