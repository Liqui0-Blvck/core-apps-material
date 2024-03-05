import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import TablaClientes from './Tabla/TablaClientes'

const ListaClientes = () => {
  const { authTokens, validToken } = useAuth()
  const { data: clientes, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/registros/clientes/`
  )

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10 relative'>
          {
            clientes 
              ? (
              <TablaClientes data={clientes} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full h-96 absolute -top-5 md:top-0 md:left-0 md:right-0 md:bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaClientes
