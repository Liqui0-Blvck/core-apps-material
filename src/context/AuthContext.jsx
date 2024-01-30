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
  const [loading, setLoading] = useState(false)

  const loginUser = async (response) => {

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
      return true
    } else if (response.status === 401) {
      return await updateToken()
      } 
    else {
      return false
    }
  }


  const updateToken = async () => {

      const response = await fetch('http://127.0.0.1:8000/auth/token/refresh/', {

        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh':authTokens?.refresh})
      })

      const data = await response.json()
      

      console.log("Me estoy ejecutando en")
      if (response.status === 200){
          setAuthTokens(data)
          setUser(jwtDecode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
          return true
      }else{
        return false
      }
    }

    useEffect(() => {
      const fourMinutes = 1000 * 60 * 4;
      const interval = setInterval(async () => {
        try {
          if (authTokens) {
            setLoading(true);
            const isTokenValid = await validToken(authTokens);
            if (!isTokenValid) {
              await updateToken();
            }
          }
        } catch (error) {
          console.error("Error al verificar o actualizar el token:", error);
        } finally {
          setLoading(false);
        }
      }, fourMinutes);
    
      return () => clearInterval(interval);
    }, [authTokens, validToken, updateToken]);
    



  const contextData = {
    user: user,
    loginUser: loginUser,
    authTokens: authTokens,
    logoutUser: logoutUser,
    validToken: validToken
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
