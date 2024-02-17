import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import FooterFormularioRegistroInvento from './FooterFormularioRegistroInvento'

const { TextArea } = Input

const FormularioRegistroInvento = () => {

  const initialRows = [
    {
      item: 0,
      cantidad: 0,
    },
  ]

  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  )

  console.log(rows)

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      foto: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/inventos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values,
            items: rows.map((row) => ({
              item: row.item,
              cantidad: row.cantidad
            }))
          })
        })

        if (response.ok) {
          toast.success("Invento creado correctamente!")
        }
      } catch (e) {
        console.log(e)
      }
    }
  })

  const handleAgregarItem = () => {
    // Agregar un nuevo ítem a la lista de ítems
    setRows((prevRows) => [
      ...prevRows,
      {
        item: "",
        unidad_de_compra: 0,
        costo_por_unidad: 0,
        fecha_llegada: "",
        observaciones: "",
      },
    ]);
  };


  const handleInputChangeItem = ({ target }) => {
    const { name, value } = target;

    setItemOrden({
      ...itemOrden,
      [name]: value
    });
  };


  return (
    <MaxWidthWrapper>
      <div className='flex items-center my-10 border border-gray-400 w-full'>
        <form onSubmit={formik.handleSubmit} className='w-full p-5'>

          <div className='grid grid-cols-6'>
            <div className='grid grid-col-2'>
              <label htmlFor="nombre">Nombre:</label>
              <Input
                onChange={formik.handleChange}
              />
            </div>

            <div className='grid grid-cols-4 col-start-4 col-span-3'>
              <label htmlFor="descripcion">Descripción: </label>
              <TextArea
                className='w-full h-full col-start-2 col-span-3'
                type='number'
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div>

          </div>

          <FooterFormularioRegistroInvento
            rows={rows}
            setRows={setRows}
            formik={formik}
            handleChange={handleInputChangeItem}
            handleAgregarItem={handleAgregarItem}
          />
          <button type='submit'>

          </button>
        </form>
      </div>
    </MaxWidthWrapper>

  )
}

export default FormularioRegistroInvento
