import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import TablaGuiaRecepcion from './Tabla/TablaGuiaRecepcion'

const ListaGuiaRecepcion = () => {
  const { authTokens, validToken } = useAuth()
  const { data: guia_recepcion, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/recepcionmp/`
  )

  console.log(guia_recepcion)

  return (
    <MaxWidthWrapper>
      <div className='flex justify-center mt-10'>
        {
          guia_recepcion
            ? (
              <TablaGuiaRecepcion data={guia_recepcion} setData={setData} token={authTokens.access} loading={loading} />
            )
            : <TableLoader className='mt-10 w-full h-full flex flex-' />
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ListaGuiaRecepcion
