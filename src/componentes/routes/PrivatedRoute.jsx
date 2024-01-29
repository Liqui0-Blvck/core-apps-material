import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivatedRoute = async () => {
  const { authTokens, validToken } = useContext(AuthContext)
  if (authTokens){
    const isValid = await validToken(authTokens)
    if (isValid) {
      return <Outlet /> ? isValid : <Navigate to='/login' /> 
    }
  }
  
}

export default PrivatedRoute
