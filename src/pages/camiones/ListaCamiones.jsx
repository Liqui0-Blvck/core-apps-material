import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TablaCamiones from './Tabla/TablaCamiones'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'

const ListaCamiones = () => {
  const { authTokens, validToken } = useAuth()
  const { data: camiones, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/registros/camiones/`
  )

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
          camiones 
            ? (
            <TablaCamiones data={camiones} setData={setData} token={authTokens.access} loading={loading}/>
            ) 
            : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaCamiones
