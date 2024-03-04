import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TablaChoferes from './Tabla/TablaChoferes'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'

const ListaClientes = () => {
  const { authTokens, validToken } = useAuth()
  const { data: clientes, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/registros/clientes/`
  )


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            clientes 
              ? (
              <TablaClientes data={clientes} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaClientes
