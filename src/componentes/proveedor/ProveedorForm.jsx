/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik, ErrorMessage } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material'


const ProveedorForm = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      nombre: '',
      rut: '',
      correo: '',
      contacto: '',
      direccion: ''
    },
    onSubmit: async values => {
      const response = await fetch('http://localhost:8000/api/proveedor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values })
      })

      if (response.ok) {
        toast.success('Muy bien cachulo')
        navigate('/item')
      } else {
        toast.error('Cualquier error es tu culpa')
      }
    }
  })

  useEffect(() => {
    axios.get('http://localhost:8000/api/proveedor')
      .then((res) => {
        setData(res.data)
      })
  }, [])


  console.log(formik.values)

  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex flex-col items-center h-full mt-14' >

      <div className='w-full h-full mx-auto justify-center grid lg:grid-cols-2 place-items-center overflow-hidden'>
        <div className='border-[1px] border-gray-300 rounded-md flex flex-col w-[80%] h-96 overflow-hidden gap-4 overflow-y-scroll p-5'>
          <h1 className='text-center'>Proveedores Añadidos</h1>
          <Divider />
          {
            data.map((cat) => (
              <div key={cat.id} className='h-14 w-full bg-gray-300 flex justify-center items-center rounded-md'>
                <span className='font-semibold tracking-wide'>{cat.nombre}</span>
              </div>
            ))
          }
        </div>

        <form className='grid grid-cols-3 items-center w-96 h-96' onSubmit={formik.handleSubmit}>
          <label htmlFor='nombre' className='text-center'>Nombre:</label>
          <input
            type="text"
            name='nombre'
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>

          <label htmlFor='rut' className='text-center'>Rut: </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.rut}
            name='rut'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>

          <label htmlFor='correo' className='text-center'>Correo: </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.correo}
            name='correo'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>

          <label htmlFor='contacto' className='text-center'>Contacto: </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.contacto}
            name='contacto'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          
          <label htmlFor='direccion' className='text-center'>Direccion: </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.direccion}
            name='direccion'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>


          <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 col-start-2 col-span-2'>Agregar</button>

        </form>
      </div>

    </div>
    </MaxWidthWrapper>
  )
}

export default ProveedorForm
