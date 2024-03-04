/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState} from 'react'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const userLocalStorage = Cookies.get('authTokens') ? jwtDecode(Cookies.get('authTokens')) : null
  const authTokenLocalStorage = Cookies.get('authTokens') ? JSON.parse(Cookies.get('authTokens')) : null
  
  const [authTokens, setAuthTokens] = useState(() => authTokenLocalStorage)
  const [user, setUser] = useState(()=> userLocalStorage)
  const [loading, setLoading] = useState(false)
  const base_url = import.meta.env.VITE_BASE_URL

  const loginUser = async (response) => {
      const data = await response.json()
      if (response.status === 200){
        setAuthTokens(data)
        Cookies.set('authTokens', JSON.stringify(data), { expires: 1 })
        setUser(jwtDecode(data.access))
      }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    Cookies.remove('authTokens')
  }


  const validToken = async (token) => {
    const response = await fetch(`${base_url}/api/token/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'token': token?.access})
    })
    
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

      const response = await fetch(`${base_url}/api/token/refresh/`, {
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
          Cookies.set('authTokens', JSON.stringify(data), { expires: 2 })
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

export const useAuth = () => useContext(AuthContext)