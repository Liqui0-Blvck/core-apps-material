import { useAuth } from '@/context/AuthContext'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaOrdenDeCompra from './Tabla/TablaOrdenDeCompra'

import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const OrdenDeCompra = () => {
  const { authTokens, validToken } = useAuth()
  const { data: orden_de_compra, setData, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/`
  )


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            orden_de_compra && (
              <TablaOrdenDeCompra data={orden_de_compra} setData={setData} token={authTokens.access} setRefresh={setRefresh}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default OrdenDeCompra
