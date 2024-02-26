import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'

import AuthContext from '../../context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TablaItem from './Tabla/TablaItem'
import TableLoader from '../loaders/TableLoader'


const ItemList = () => {
  const { authTokens, validToken } = useContext(AuthContext)
 const { data: items, setData, loading } = useAuthenticatedFetch(
  authTokens,
  validToken,
  `/api/items/`
 )



  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            items 
              ? (
              <TablaItem data={items} setData={setData} token={authTokens.access} loading={loading}/>
              ) 
              : <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default ItemList
