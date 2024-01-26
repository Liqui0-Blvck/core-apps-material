/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState} from 'react'
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({ children }) => {
  const userLocalStorage = localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  const authTokenLocalStorage = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  
  const [authTokens, setAuthTokens] = useState(() => authTokenLocalStorage)
  const [user, setUser] = useState(()=> userLocalStorage)
  const [loading, setLoading] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)

  const loginUser = async (response) => {
    console.log(response)

      const data = await response.json()

      if (response.status === 200){
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
      }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    
  }

  console.log(tokenValid)

  const validToken = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/auth/token/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'token': token?.access})
    })

    console.log(response)
    
    if (response.status === 200){
      setTokenValid(true)
      return true
    } else if (response.status === 401) {
      const response = await updateToken()
      if (!response){
       return false
      }
    } 
    else {
      return false
    }
  }





  const updateToken = async () => {

    console.log("me estoy ejecutando")

      const response = await fetch('http://127.0.0.1:8000/auth/token/refresh/', {

        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh':authTokens?.refresh})
      })

      const data = await response.json()
      
      if (response.status === 200){
          setAuthTokens(data)
          setUser(jwtDecode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
          return true
      }else{
        return false
        //   logoutUser()

        // console.log("algo")
      }

      if(loading){
          setLoading(false)
      }

    }

    useEffect(()=> {

      if(loading){
        
      }

      const fourMinutes = 1000 * 60 * 4


      const interval =  setInterval(()=> {
          if(authTokens){
            updateToken()
          }
      }, fourMinutes)
      return ()=> clearInterval(interval)

    }, [authTokens, loading])



  const contextData = {
    user: user,
    loginUser: loginUser,
    authTokens: authTokens,
    logoutUser: logoutUser, 
    tokenValid: tokenValid,
    validToken: validToken
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
