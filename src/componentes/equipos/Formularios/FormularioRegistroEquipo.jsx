import { compresor } from '@/services/compresor_imagen'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';
import { useFormik } from 'formik';
import { useClient } from '@/context/ClientContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input

const FormularioRegistroEquipo = () => {
  const { authTokens, user } = useAuth()
  const { clientInfo } = useClient()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      marca: "",
      procesador: "",
      detalle_procesador: "",
      ram: "",
      tipo_disco: "",
      capacidad_disco: "",
      licencia: "",
      numero_serie: "",
      observaciones: "",
      registrado_por: null,
      cliente: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/equipos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...values,
            registrado_por: user.user_id,
            cliente: clientInfo && clientInfo.id
          })
        })

        if (response.ok){
          toast.success('Equipo registrado correctamente!')
          navigate('/app/equipos')
        } else {
          toast.error('No se pudo registrar el equipo, vuelva a intentarlo!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })


  return (
    <form className='flex flex-col md:grid lg:grid md:grid-cols-6 lg:grid-cols-6 place-items-center items-center gap-8 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='
        w-full
        lg:col-span-2
        md:col-span-2
        grid grid-cols-2 items-center'>
        <label htmlFor='marca' className='text-start'>Marca:</label>
        <Input
          type="text"
          name='marca'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.marca}
          className={`
          ${formik.errors.marca && formik.touched.marca 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.marca && formik.errors.marca && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.marca}</div>
          )}
      </div>
      
      <div className='w-full grid grid-cols-2 items-center col-start-3 col-span-2 h-full'>
        <label htmlFor='procesador' className='text-center w-10'>Procesador: </label>
        <Input
          type='text'
          name='procesador'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
          ${formik.errors.procesador && formik.touched.procesador 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>

          {formik.touched.procesador && formik.errors.procesador && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.procesador}</div>
          )}
      </div>
      

      <div className='w-full grid grid-cols-2 items-center col-start-5 col-span-2'>
        <label htmlFor='detalle_procesador' className='text-start'>Detalle Procesador:</label>
        <Input
          type="text"
          name='detalle_procesador'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.detalle_procesador}
          className={`
          ${formik.errors.detalle_procesador && formik.touched.detalle_procesador 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.detalle_procesador && formik.errors.detalle_procesador && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.detalle_procesador}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-2 col-start- col-span-2'>
        <label htmlFor='ram' className='text-start'>Ram:</label>
        <Input
          type="text"
          name='ram'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ram}
          className={`
          ${formik.errors.ram && formik.touched.ram 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.ram && formik.errors.ram && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.ram}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-2 col-start-3 col-span-2'>
        <label htmlFor='tipo_disco' className='text-start'>Tipo Disco:</label>
        <Input
          type="text"
          name='tipo_disco'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tipo_disco}
          className={`
          ${formik.errors.tipo_disco && formik.touched.tipo_disco 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.tipo_disco && formik.errors.tipo_disco && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.tipo_disco}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-2 row-span-2 col-start-5 col-span-2'>
        <label htmlFor='observaciones' className='text-start'>Observaciones:</label>
        <TextArea
          rows={6} 
          type="text"
          name='observaciones'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.observaciones}
          className={`
          ${formik.errors.observaciones && formik.touched.observaciones 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.observaciones && formik.errors.observaciones && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.observaciones}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-3 col-start- col-span-2'>
        <label htmlFor='licencia' className='text-start'>Licencia:</label>
        <Input
          type="text"
          name='licencia'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.licencia}
          className={`
          ${formik.errors.username && formik.touched.username 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.licencia && formik.errors.licencia && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.licencia}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-3 col-start-3 col-span-2'>
        <label htmlFor='capacidad_disco' className='text-start'>Capacidad Disco:</label>
        <Input
          type="text"
          name='capacidad_disco'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.capacidad_disco}
          className={`
          ${formik.errors.capacidad_disco && formik.touched.capacidad_disco 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.capacidad_disco && formik.errors.capacidad_disco && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.capacidad_disco}</div>
          )}
      </div>

      <div className='w-full grid grid-cols-2 items-center row-start-4  col-span-2'>
        <label htmlFor='numero_serie' className='text-start'>Número de Serie:</label>
        <Input
          type="text"
          name='numero_serie'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.numero_serie}
          className={`
          ${formik.errors.username && formik.touched.username 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.numero_serie && formik.errors.numero_serie && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.numero_serie}</div>
          )}
      </div>

      <button type='submit' className='row-start-4 col-start-5 col-span-2 p-2 bg-blue-400 hover:bg-blue-300 text-white rounded-md mt-5 w-full'>Agregar</button>
    </form>
  )
}

export default FormularioRegistroEquipo
