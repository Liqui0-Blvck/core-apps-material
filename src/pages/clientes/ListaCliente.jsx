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
      <div className='flex w-full justify-center mt-10'>
        {
          clientes
            ? (
              <TablaClientes data={clientes} setData={setData} token={authTokens.access} loading={loading} />
            )
            : <TableLoader className='mt-10 w-full h-full flex flex-' />

        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ListaClientes
