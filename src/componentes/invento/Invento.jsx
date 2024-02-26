import MaxWidthWrapper from '../MaxWidthWrapper'
import { useAuth } from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

import TablaInvento from './Tabla/TablaInvento'
import TableLoader from '../loaders/TableLoader'


const Invento = () => {
  const { authTokens, validToken } = useAuth()
  const { data: inventos, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/inventos/`
  )

  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            inventos
              ? 
                (
                  <TablaInvento data={inventos} setData={setData} token={authTokens.access} loading={loading}/>
                )
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
              
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Invento
