import { useContext } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from './Tabla/TablaContenedor'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TableLoader from '../loaders/TableLoader'

const Contenedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: contenedor, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    '/api/contenedores/'
  )

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            contenedor
              ? (
                <TablaContenedor data={contenedor} setData={setData} token={authTokens.access} loading={loading}/>
                )
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
