import { compresor } from '@/services/compresor_imagen'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useFormik } from 'formik';
import { ComponenteSchema } from '@/services/Validator'
import { useAuth } from '@/context/AuthContext';
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper';
import toast from 'react-hot-toast';
import { ESTADO_CLIENTE, TIPO_CLIENTE } from '@/const/constantes';

const { TextArea } = Input;

const FormularioRegistroClientes = () => {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  const { authTokens, validToken } = useAuth()
  const navigate = useNavigate()
  const base_url = import.meta.env.VITE_BASE_URL
  
  const formik = useFormik({
    initialValues: {
      nombre: "",
      run: "",
      contacto: "",
      correo: "",
      tipo_cliente: null,
      estado_cliente: "",
      logo: null
    },
    onSubmit: async (values) => {
      
      const estado_label = ESTADO_CLIENTE.find(estado => estado.value === values.estado_cliente)?.label
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('run', values.run);
      formData.append('contacto', values.contacto);
      formData.append('correo', values.correo)
      formData.append('tipo_cliente', values.tipo_cliente)
      formData.append('estado_cliente', estado_label)
      if (values.logo instanceof File){
        formData.append('logo', values.logo);
      }
  
      try {
        const response = await fetch(`${base_url}/api/clientes/`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${authTokens.access}`
          },
          body: formData,
        });
  
        if (response.ok) {
          toast.success('Cliente registrado exitosamente!');
          formik.setValues(formik.initialValues);
          navigate('/app/clientes/')
        } else {
          toast.error('Error al registrar el cliente');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });
  

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


  console.log(formik.values)
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col mt-10 relative'>
        <form className='flex flex-col md:grid lg:grid md:grid-cols-6 lg:grid-cols-6 items-center gap-8 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <div 
            className='
              w-full 
              lg:row-span-2 lg:col-span-2
              md:row-span-2 md:col-span-2
              border-[2px] h-44 border-dashed
              bg-white
            border-[#224871] rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
            onClick={() => document.getElementById('input-field').click()}>
            <h1 className='font-semibold text-center'>{filename}</h1>
            <input
              type='file'
              name='logo'
              accept='image/*'
              onChange={async (e) => {
                
                if (e.currentTarget.files){
                  const compresor_result = await compresor(e.currentTarget.files[0], 0.2)
                  if (compresor_result){
                    const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                    setImagen(file)
                    formik.setFieldValue('logo', file)
                    setFilename('Foto seleccionada')
                  }
                }
            }}
              className='hidden'
              id='input-field'/>

            {
              imagen &&  (
                <>
                <div className='absolute h-7 w-7 bg-red-800 rounded-full flex justify-center items-center -right-2 -top-2 cursor-pointer z-20'>
                        <IoMdClose 
                          className='absolute text-2xl text-white z-100'
                          onClick={() => {
                            setImagen(null)
                            setFilename('No hay ninguna foto seleccionada')
                          }}
                        />
                      </div>
                <img src={URL.createObjectURL(imagen)} alt="" className='z-10 absolute w-full h-full object-contain rounded-md first-letter:'/>
                </>
                )
            }
          </div>

          <div 
            className='
            w-full
            lg:col-start-3 lg:col-span-2
            md:col-start-3 md:col-span-2
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
          
          <div className='w-full grid grid-cols-2  col-span-2 col-start-5 items-center'>
            <label htmlFor="run">Run: </label>
            <Input
              type="text"
              name='run'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.run}
              className={`
              ${formik.errors.run && formik.touched.run 
                ? 'border-[2px] text-red-900' 
                : 'border-[1px] border-gray-300'}
              rounded-md p-2 mt-1 col-span-2`
              }/>
              {formik.touched.run && formik.errors.run && (
                <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.run}</div>
              )}
          </div>

          <div className='w-full grid grid-cols-2 row-start-2 col-span-2 col-start-5 items-center'>
            <label htmlFor="contaccto">Contacto: </label>
            <Input
              type="text"
              name='contacto'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contacto}
              className={`
              ${formik.errors.contacto && formik.touched.contacto 
                ? 'border-[2px] text-red-900' 
                : 'border-[1px] border-gray-300'}
              rounded-md p-2 mt-1 col-span-2`
              }/>
              {formik.touched.contacto && formik.errors.contacto && (
                <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.contacto}</div>
              )}
          </div> 
          

          <div className='w-full grid grid-cols-2 row-start-2 col-span-2 col-start-3 items-center'>
            <label htmlFor="correo">Correo: </label>
            <Input
              type='email'
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

          <div className='w-full grid grid-cols-2 items-center row-start-3  col-span-2'>
            <label htmlFor='cliente' className='text-start'>Tipo Cliente:</label>
            <Select
              showSearch
              placeholder="Selecciona un tipo cliente"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={value => formik.setFieldValue('tipo_cliente', value) }
              onSearch={onSearch}
              name='cliente'
              filterOption={filterOption}
              options={TIPO_CLIENTE.map(cli => ({
                value: cli.value,
                label: cli.label
              }))}
            />
          </div>
          
          <div className='w-full grid grid-cols-2 items-center row-start-3 col-start-3 col-span-2'>
            <label htmlFor='cliente' className='text-start'>Estado Cliente:</label>
            <Select
              showSearch
              placeholder="Selecciona un tipo cliente"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={value => formik.setFieldValue('estado_cliente', value) }
              onSearch={onSearch}
              name='cliente'
              filterOption={filterOption}
              options={ESTADO_CLIENTE.map(cli => ({
                value: cli.value,
                label: cli.label
              }))}
            />
          </div>

          <button type='submit' className='row-start-3 font-semibold col-start-5 col-span-2 text-white p-2 bg-[#224871] hover:bg-[#224871ce] rounded-md mt-5 w-full'>Agregar</button>
        </form>
      </div>
    </MaxWidthWrapper>
  )
}

export default FormularioRegistroClientes
