import React, { useMemo } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import TablaGuiaDeSalida from './Tabla/TablaGuiaDeSalida'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const GuiaDeSalida = () => {
  const { authTokens, validToken } = useAuth()
  const { data: guia_salida, setData, setRefresh} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/guia_salidas/`
  ) 

  const formatearFecha = useMemo(
    () => (fecha) => {
      return new Date(fecha).toLocaleDateString('es-ES', {
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
    return guia_salida && guia_salida.map((dato) => ({
      ...dato,
      fecha_creacion: formatearFecha(dato.fecha_creacion)
    }))
  }, [guia_salida, formatearFecha])


   return (
    <MaxWidthWrapper>
        {
          guia_salida && (
            <div className='flex justify-center mt-10'>
              <TablaGuiaDeSalida data={datosFormateados} setData={setData} token={authTokens.access} setRefresh={setRefresh}/>
            </div>
          )
        }
    </MaxWidthWrapper>
  )
}

export default GuiaDeSalida
