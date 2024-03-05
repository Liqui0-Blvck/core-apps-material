import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import TablaProductores from './Tabla/TablaProductores'

const ListaProductores = () => {
  const { authTokens, validToken } = useAuth()
  const { data: productores, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/productores/`
  )


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            productores 
              ? (
              <TablaProductores data={productores} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaProductores