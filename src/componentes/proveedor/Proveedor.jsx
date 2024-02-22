import { useContext, useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaProveedor from './Tabla/TablaProveedor'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const Proveedor = () => {
  const { authTokens, validToken } = useContext(AuthContext) 
  const { data: proveedor, setData, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/`
  )

  console.log(proveedor)

 
  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    },
    []
  )

  const datosFormateados = useMemo(() => {
    return proveedor && proveedor.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [proveedor, formatearFecha])


  return (
    <MaxWidthWrapper>
        <div className='flex justify-center mt-10'>
          {
            proveedor && (
              <TablaProveedor 
                data={datosFormateados} 
                setData={setData} 
                token={authTokens.access} 
                loading={loading}
                refresh={setRefresh}/>
            )
          }
        </div>
    </MaxWidthWrapper>
  )
}

export default Proveedor
