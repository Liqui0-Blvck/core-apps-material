import React, { Suspense } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaGuiaDeSalida from './Tabla/TablaGuiaDeSalida'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TableLoader from '../loaders/TableLoader'

const GuiaDeSalida = () => {
  const { authTokens, validToken } = useAuth();
  const { data: guia_salida, setData, loading, setRefresh} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/guia_salidas/`
  )

  return (
    <MaxWidthWrapper>
      {guia_salida ? (
        <div className='flex justify-center mt-10 flex-col'>
            <TablaGuiaDeSalida
              data={guia_salida}
              setData={setData}
              token={authTokens.access}
              setRefresh={setRefresh}
              loading={loading}
            />
        </div>
        
      ) : (
        <TableLoader className='w-[80%] absolute top-32 left-56 right-0 bottom-0'/>
      )}
    </MaxWidthWrapper>
  );
};

export default GuiaDeSalida
