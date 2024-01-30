import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import MaxWidthWrapper from '../MaxWidthWrapper'

const OrdenCompraDetail = () => {


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
      <CartDetail
        titulo='Orden de Compra'
        estado={data.estado_oc_label} 
        nombre={data.nombre}
        items={data.items}
        proveedor={data.proveedor_nombre}
        solicitado={data.solicitado_por}
        numero_ct={data.numero_cotizacion}
        fecha_creacion={formatearFecha(data.fecha_creacion)}/>
    </MaxWidthWrapper>
  )
}

export default OrdenCompraDetail



import CartDetail from './CartDetail'