import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export const useAuthenticatedFetch = (token, validate, url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  const base_url = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)

        if (!isMounted) return

        const isValid = validate(token)

        if (!isValid) {
          navigate('/auth/sign-in')
        } else {
          const response = await fetch((base_url + url), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token.access}`
            }
          })

          if (response.ok) {
            const data = await response.json()
            setData(data)
          } else if (response.status === 401) {
            setError('No estas autorizado para hacer esta petición')
          } else if (response.status === 404) {
            setError('la url que ingresaste no tiene ninguna información')
          } else {
            setError('Cualquier otro error')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()

    if (refresh) {
      fetchData()
    }

    setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => {
      isMounted = false
      setRefresh(false)
    }
  }, [url, refresh])

  return {
    loading,
    error,
    data,
    setData,
    setRefresh
  }
}

export const useAuthenticatePost = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()


  const usePostPutDelete = async (token, validate, url, body, request, url_to, modal) => {
    const isValid = validate(token)
    if (!isValid) {
      navigate('/app/home/')
    } else {
      const res = await fetch((base_url + url), {
        method: request,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`
        },
        body: body
      })

      if (res.ok) {
        toast.success("El operario fue registrado exitosamente!!")
        navigate(url_to)
        modal ? modal : null
      } else {
        toast.error("No se pudo registrar el camión volver a intentar")
      }
    }
  }

  return {
    usePostPutDelete
  }
}