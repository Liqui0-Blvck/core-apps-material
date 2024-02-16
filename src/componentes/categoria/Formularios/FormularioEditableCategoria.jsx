/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CategoriaSchema } from '../../../services/Validator'
import AuthContext from '@/context/AuthContext'
import { Input } from 'antd'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const { TextArea } = Input

const FormularioEditableCategoria = ({ modalClose, id, refresh }) => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/categoria/${id}`
  )


  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
    },
    validationSchema: CategoriaSchema,
    onSubmit: async values => {
      const response = await fetch(`http://localhost:8000/api/categoria/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${authTokens.access}`
        },
        body: JSON.stringify({ ...values })
      })

      if (response.ok) {
        toast.success('Categoria agregada con exito!')
        modalClose(false)
        refresh(true)
      } else {
        toast.error('Error en')
      }
    }
  })

  useEffect(() => {
    let isMounted = true

    if (data && isMounted){
      formik.setValues({
        nombre: data.nombre,
        descripcion: data.descripcion
      })
    }

    return () => {
      isMounted = false
    }
  }, [data])

  return (
  <div className='items-center h-full' >
    <form className='grid grid-rows-3 grid-cols-2 gap-2 w-full h-72' onSubmit={formik.handleSubmit}>
      <div className='flex items-center col-span-2 w-full gap-5 '>
        <label htmlFor='nombre' className='text-center w-28'>Nombre:</label>
        
        <div className='flex flex-col w-full'>
          <input
            type="text"
            name='nombre'
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2 w-full'/>
          {
            formik.errors.nombre && formik.touched.nombre && (
              <p className='text-red-600 text-center'>{formik.errors.nombre}</p>
            )
          }
        </div>
      </div>
        

      <div className='flex row-start-2 col-span-2 gap-5'>
        <label htmlFor='Descripcion' className='text-center w-28'>Descripcion: </label>
        <TextArea
            rows={7} 
            name='descripcion'
            className='col-span-2'
            placeholder="Largo máximo 50"
            maxLength={101} 
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            onBlur={formik.handleBlur}
            />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.descripcion}</div>
            )}
      </div>
      
      <div className='h-10 row-start-3 col-start-2 w-full'>
        <button 
          type='submit' 
          className='w-full h-full rounded-md 
            mt-5 col-start-2 col-span-2
            border border-blue-600 hover:bg-blue-gray-100 transition
            ease-in text-blue-800
        '>Agregar</button>
      </div>

    </form>
  </div>
  )
}

export default FormularioEditableCategoria
