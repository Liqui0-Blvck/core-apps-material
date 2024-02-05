import React from 'react'
import BasicTable from './TablaItems'

const ItemOrdenForm = ({ itemProveedor, formik, rows, setRows, handleAgregarItem }) => {
  return (
    <div className='mb-10'>
      <BasicTable
        rows={rows}
        setRows={setRows} 
        itemProveedor={itemProveedor}
        formik={formik}
        handleAgregar={handleAgregarItem}
        />
    </div>
  )
}

export default ItemOrdenForm
