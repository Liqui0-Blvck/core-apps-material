import AuthContext, { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import CardEnterprise from '@/componentes/cards/CardEnterprise'
import { useClient } from '@/context/ClientContext'


export const Clientes = () => {
  const { authTokens, validToken } = useAuth()
  const { data: clientes, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/clientes/`
  )


  return (
    <div className='h-96 mt-16'>
      <div className='h-full flex flex-wrap gap-5'>
        {
          clientes && clientes.map((cliente) => {
           return (
            <CardEnterprise
              key={cliente.id} 
              cliente={cliente}/>
           ) 
          })
        }
      </div>
    </div>
  )
}

