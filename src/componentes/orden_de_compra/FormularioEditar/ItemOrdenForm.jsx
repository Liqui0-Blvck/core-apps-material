import React from 'react'
import BasicTable from './TablaItems'

const ItemOrdenForm = ({ handleSubmit, items, handleChange, rows, setRows, handleAgregarItem, ordenCompra}) => {
  return (
    <div className='mb-10'>
      <BasicTable
        ordenCompra={ordenCompra}
        rows={rows}
        setRows={setRows} 
        itemProveedor={items}
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleAgregar={handleAgregarItem}
        />
    </div>
  )
}

export default ItemOrdenForm
