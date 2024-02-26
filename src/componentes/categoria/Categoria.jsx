import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TransitionsModal from '../Item/Modal/ModalSearchItem'
import TablaCategorias from './Tabla/TablaCategorias'
import AuthContext, { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import TableLoader from '../loaders/TableLoader'

const Categoria = () => {
  const { authTokens, validToken } = useAuth()
  const { data: categorias, setData, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/categoria/`
  )

  
  return (
    <MaxWidthWrapper>
      <div className='flex justify-center mt-10'>
        {
          categorias 
            ? (
              <TablaCategorias data={categorias} setData={setData} token={authTokens.access} setRefresh={setRefresh}/>
              )
            : (
              <TableLoader className='w-full absolute top-32 left-40 right-0 bottom-0'/>
            )

        }
      </div>
    </MaxWidthWrapper>
  )
}

export default Categoria
