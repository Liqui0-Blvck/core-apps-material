import React from 'react'
import BasicTable from './TablaItems'

const ItemOrdenForm = ({ itemProveedor, rows, ordenCompra}) => {
  return (
    <div className='mb-10'>
      <BasicTable
        ordenCompra={ordenCompra}
        rows={rows}
        itemProveedor={itemProveedor}
        />
    </div>
  )
}

export default ItemOrdenForm
