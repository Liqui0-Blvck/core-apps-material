import { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useAuth } from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useClient } from '@/context/ClientContext'
import TablaTickets from './Tabla/TablaTickets'


const Tickets = () => {
  const { clientInfo } = useClient()
  const { authTokens, validToken } = useAuth()
  const { data: tickets, setData, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/tickets/?search=${clientInfo && clientInfo.id}`
  )

  console.log(tickets)
  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            tickets && 
            (
              <TablaTickets data={tickets} setData={setData} token={authTokens.access} loading={loading} setRefresh={setRefresh}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Tickets
