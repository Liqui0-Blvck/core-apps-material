import MaxWidthWrapper from '../MaxWidthWrapper'
import TableLoader from '../loaders/TableLoader'
import TablaProveedor from './Tabla/TablaProveedor'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const Proveedor = () => {
  const { authTokens, validToken } = useAuth()
  const { data: proveedor, setData, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/proveedor/`
  )


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            proveedor 
              ? (
                <TablaProveedor 
                  data={proveedor} 
                  setData={setData} 
                  token={authTokens.access} 
                  loading={loading}
                  refresh={setRefresh}/>
                )
              :  <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Proveedor
