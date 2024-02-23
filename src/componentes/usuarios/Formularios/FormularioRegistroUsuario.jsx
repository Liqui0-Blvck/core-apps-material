import { compresor } from '@/services/compresor_imagen'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';
import { useFormik } from 'formik';
import { useClient } from '@/context/ClientContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { DEPARTAMENTO } from '@/const/constantes';

const { TextArea } = Input;

const FormularioRegistroUsuario = ({ id }) => {
  const { authTokens, validToken } = useAuth()
  const { clientInfo } = useClient()
  const { data: usuario } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/usuario/${id}`
  )
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      departamento: "",
      cliente: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/usuarios/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...values,
            cliente: clientInfo && clientInfo.id
          })
        })

        if (response.ok){
          toast.success('Usuario registrado correctamente!')
          navigate('/app/usuarios')
        } else {
          toast.error('No se pudo registrar el usuario, vuelva a intentarlo!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


  return (
    <form className='flex flex-col md:grid lg:grid md:grid-cols-4 lg:grid-cols-4 place-items-center items-center gap-8 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='
        w-96
        lg:col-span-2
        md:col-span-2
        grid grid-cols-2 items-center'>
        <label htmlFor='nombre' className='text-start'>Nombre:</label>
        <Input
          type="text"
          name='nombre'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nombre}
          className={`
          ${formik.errors.username && formik.touched.username 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.nombre && formik.errors.nombre && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.nombre}</div>
          )}
      </div>
      
      <div className='w-96 grid grid-cols-2 items-center col-start- col-span-2 h-full'>
        <label htmlFor='apellido' className='text-center w-10'>Apellido: </label>
        <Input
          type='text'
          name='apellido'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
          ${formik.errors.apellido && formik.touched.apellido 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>

          {formik.touched.apellido && formik.errors.apellido && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.apellido}</div>
          )}
      </div>
      

      <div className='w-96 grid grid-cols-2 items-center row-start-2 col-span-2'>
        <label htmlFor='correo' className='text-start'>Correo:</label>
        <Input
          type="email"
          name='correo'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.correo}
          className={`
          ${formik.errors.correo && formik.touched.correo 
            ? 'border-[2px] text-red-900' 
            : 'border-[1px] border-gray-300'}
          rounded-md p-2 mt-1 col-span-2`
          }/>
          {formik.touched.correo && formik.errors.correo && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.correo}</div>
          )}
      </div>

      <div className='w-96 grid grid-cols-2 items-center row-start-2 col-start- col-span-2'>
        <label htmlFor='departamento' className='text-start'>Departamento:</label>
        <Select
          showSearch
          placeholder="Selecciona una departamento"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={e => formik.setFieldValue('departamento', e)}
          onSearch={onSearch}
          name='departamento'
          filterOption={filterOption}
          options={DEPARTAMENTO.map((estado) => ({
            value: estado,
            label: estado
          }))}
          />
          {formik.touched.departamento && formik.errors.departamento && (
            <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.departamento}</div>
          )}
      </div>

      <button type='submit' className='row-start-3 col-start-3 col-span-2 p-2 text-white bg-[#224871] hover:bg-[#224871ce] rounded-md mt-5 w-96'>Agregar</button>
    </form>
  )
}

export default FormularioRegistroUsuario
