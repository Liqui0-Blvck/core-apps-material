import { useContext, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import CartDetail from './CartDetail'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useAsyncFetchGet } from '@/hooks/useFetch'
import AuthContext from '@/context/AuthContext'


const ItemDetail = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [data, setData] = useState({})


  const navigate = useNavigate()
    validToken(authTokens)
      .then((res) => {
        if (!res){
          navigate('/auth/sign-in/')
        } else {
          // setData(data)
        }
      })
      .catch ((error) => {
        console.log(error)
      })


    useEffect(() => {
      const getItemDetailData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api${pathname}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok){
          const data = await response.json()
          setData(data)
        } else {
          console.log("Error en la petición")
        }
      }

      getItemDetailData()

      return () => {}
    }, [])

  
  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      })
    },
    []
  )

  return (
    <MaxWidthWrapper>
      <div className='my-14'>
        <CartDetail
          titulo='Item'
          foto={data.foto} 
          nombre={data.nombre}
          descripcion={data.descripcion}
          fecha_creacion={formatearFecha(data.fecha_creacion)}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemDetail
