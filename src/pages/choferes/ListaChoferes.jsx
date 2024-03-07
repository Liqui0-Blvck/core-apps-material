import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TablaChoferes from './Tabla/TablaChoferes'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'

const ListaChoferes = () => {
  const { authTokens, validToken } = useAuth()
  const { data: choferes, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/registros/choferes/`
  )


  return (
    <MaxWidthWrapper>
      <div className='flex justify-center mt-10'>
        {
          choferes
            ? (
              <TablaChoferes data={choferes} setData={setData} token={authTokens.access} loading={loading} />
            )
            : <TableLoader className='mt-10 w-full h-full flex flex-' />


        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ListaChoferes
