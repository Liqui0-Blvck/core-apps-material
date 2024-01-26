import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import BasicTable from './TablaItems'

const ItemOrdenForm = ({ handleSubmit, itemProveedor, handleChange, rows, setRows, handleAgregarItem }) => {
  return (
    <div className='mb-10'>
      <BasicTable
        rows={rows}
        setRows={setRows} 
        itemProveedor={itemProveedor}
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleAgregar={handleAgregarItem}
        />
    </div>
  )
}

export default ItemOrdenForm
