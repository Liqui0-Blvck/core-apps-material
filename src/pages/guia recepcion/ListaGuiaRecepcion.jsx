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
        <div className='flex justify-center mt-10 relative'>
          {
            guia_recepcion 
              ? (
              <TablaGuiaRecepcion data={guia_recepcion} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full absolute top-10 right-0 bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaGuiaRecepcion
