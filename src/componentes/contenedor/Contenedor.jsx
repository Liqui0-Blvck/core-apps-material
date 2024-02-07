import { useContext, useMemo} from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaContenedor from '../contenedor/TablaContenedor'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const Contenedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: contenedor, setData, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/contenedor/'
  )

  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return contenedor && contenedor.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [contenedor, formatearFecha])


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            contenedor && (
              <TablaContenedor data={datosFormateados} setData={setData} token={authTokens.access} loading={loading}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Contenedor
