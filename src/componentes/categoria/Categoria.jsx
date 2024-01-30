import { useContext, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TransitionsModal from '../Modal'
import TablaCategorias from './TablaCategorias'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Categoria = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [categorias, setCategorias] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    let isMounted = true; 
  
    const fetchData = async () => {
      try {
        const isTokenValid = await validToken(authTokens);
  
        if (!isMounted) return; 
        if (!isTokenValid) {
          navigate('/auth/sign-in/');
        } else {
 
          const response = await fetch('http://127.0.0.1:8000/api/categoria/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization':  `Bearer ${authTokens.access}`
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            setCategorias(data);
          } else {
            console.log("Error en la petición");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false; 
    };
  }, [authTokens, navigate, validToken]);


  

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

  const datosFormateados = useMemo(() => {
    return categorias.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [categorias, formatearFecha])

  
  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex justify-center'>
        <TablaCategorias data={datosFormateados} setData={setCategorias} token={authTokens.access}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default Categoria
