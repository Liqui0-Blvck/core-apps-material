import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import TablaComercializador from './Tabla/TablaComercializador'

const ListaComercializadores = () => {
  const { authTokens, validToken } = useAuth()
  const { data: comercializador, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/comercializador/`
  )

  console.log(comercializador)

  return (
    <MaxWidthWrapper>
      <div className='flex justify-center mt-10'>
        {
          loading && comercializador
            ? (
              <TablaComercializador data={comercializador} setData={setData} token={authTokens.access} loading={loading} />
            )
            : <TableLoader className='mt-10 w-full h-full flex flex-' />
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default ListaComercializadores
