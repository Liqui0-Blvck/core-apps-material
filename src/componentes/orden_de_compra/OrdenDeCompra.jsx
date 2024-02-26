import { useAuth } from '@/context/AuthContext'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaOrdenDeCompra from './Tabla/TablaOrdenDeCompra'

import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TableLoader from '../loaders/TableLoader'

const OrdenDeCompra = () => {
  const { authTokens, validToken } = useAuth()
  const { data: orden_de_compra, setData, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/orden-compra/`
  )


  return (
    <MaxWidthWrapper>
      <div className='flex justify-center mt-10'>
        {
          orden_de_compra 
            ? (
              <TablaOrdenDeCompra data={orden_de_compra} setData={setData} token={authTokens.access} setRefresh={setRefresh} />
              )
            : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default OrdenDeCompra
