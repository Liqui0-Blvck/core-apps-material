import { useFormik } from 'formik'
import React from 'react'

const SucursalForm = () => {

  const formikSucursal = useFormik({
    initialValues: {
      "direccion": "",
      "numero": "",
      "comuna": null,
      "region": null,
      "provincia": null,
      "proveedor": null
    },
    onSubmit: async values => { 
      const response = await fetch('http://localhost:8000/api/sucursal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, proveedor: idProveedor, direccion: data.direccion })
      })

      if (response.ok) {
        toast.success('Muy bien cachulo')
        navigate('/proveedores/')
      } else {
        toast.error('Cualquier error es tu culpa')
      }
    }
  })
  return (
    <div>
      
    </div>
  )
}

export default SucursalForm
