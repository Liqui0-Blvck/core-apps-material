import { useState, useEffect } from 'react'

export const useAsyncFetchGet = (url, token) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("montado")
    const getData = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.access}`
        }
      })

      if (response.ok){
        setResponse(response)
      } else {
        setError(response.status)
      }
    }

    getData()


    return () => {
      hookMontado = false
      console.log("desmontado")
    }
    
  }, [])

  return { ok: response, bad: error}
}




// import AuthContext from '@/context/AuthContext'
// import axios from 'axios'

// export const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })


// import { useContext, useEffect, useState } from 'react'

// export const useAxiosInterceptor = () => {
//   const { authTokens } = useContext(AuthContext)



//   const reqResInterceptor = (config) => {
//     config.headers = {
//       Authorization: `Bearer ${authTokens.access}`
//     }

//     return config
//   }

//   const reqErrInterceptor = async (error) => Promise.reject(error)

//   const resResInterceptor = async (response) => { return response }

//   const resErrInterceptor = async (error) => {
//     const originalRequest = error.config

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       try {
//         const newAccessToken = await authTokens.access
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
//       } catch (error) {
//         console.log("El refresco del token fallo", error)
//       }
//     }
//     return Promise.reject(error)
//   }
  

//   useEffect(() => {
//     const reqInterceptor = axiosInstance.interceptors.request.use(
//       reqResInterceptor,
//       reqErrInterceptor
//     )

//     const resInterceptor = axiosInstance.interceptors.response.use(
//       resResInterceptor,
//       resErrInterceptor
//     )


//     return () => {
//       axiosInstance.interceptors.request.eject(reqInterceptor)

//       axiosInstance.interceptors.response.eject(resInterceptor)
//     }
//   }, [authTokens])
  
//   return { axiosFetch: axiosInstance}
// }

