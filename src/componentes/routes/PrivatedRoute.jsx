import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivatedRoute = () => {
  const { authToken } = useContext(AuthContext)
  return <Outlet /> ? authToken : <Navigate to='/login' /> 
}

export default PrivatedRoute
