import TableLoader from '@/componentes/loaders/TableLoader'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import TablaOperarios from './Tabla/TablaOperarios'

const ListaOperarios = () => {
  const { authTokens, validToken } = useAuth()
  const { data: operarios, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/registros/operarios/`
  )

  console.log(operarios)

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            operarios 
              ? (
              <TablaOperarios data={operarios} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ListaOperarios
