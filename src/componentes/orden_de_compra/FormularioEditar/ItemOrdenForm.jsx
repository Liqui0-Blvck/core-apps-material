import React from 'react'
import BasicTable from './TablaItems'

const ItemOrdenForm = ({ handleSubmit, itemProveedor, handleChange, rows, setRows, handleAgregarItem, ordenCompra, editedOrdenCompra, setEditMode, editMode, editedRow, setEditedRow}) => {
  return (
    <div className='mb-10'>
      <BasicTable
        editedOrdenCompra={editedOrdenCompra}
        editMode={editMode}
        setEditMode={setEditMode}
        ordenCompra={ordenCompra}
        editedRow={editedRow}
        setEditedRow={setEditedRow}
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
