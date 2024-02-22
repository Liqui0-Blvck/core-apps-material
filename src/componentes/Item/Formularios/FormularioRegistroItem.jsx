import { compresor } from '@/services/compresor_imagen'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper';
import { ComponenteSchema } from '@/services/Validator';
import ModalFormularioCategoria from '../../categoria/Modal/ModalFormularioCategoria';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const FormularioRegistroItem = () => {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  const { authTokens, validToken } = useAuth()
  const navigate = useNavigate()
  const { data: categoria, loading, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/categoria/'
    )
    
  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      categoria: '',
      marca: '',
      foto: '',
    },
    validationSchema: ComponenteSchema,
    onSubmit: async (values) => {
 
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('categoria', values.categoria);
      formData.append('marca', values.marca)
      formData.append('foto', values.foto);
  
      try {
        const response = await fetch('http://localhost:8000/api/items/', {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${authTokens.access}`
          },
          body: formData,
        });
  
        if (response.ok) {
          toast.success('Item añadido correctamente!');
          formik.setValues(formik.initialValues);
          navigate('/app/item/')
        } else {
          toast.error('Error al añadir el item');
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

  return (
    <MaxWidthWrapper>
      <div className='flex flex-col mt-10 relative'>
        <div className='absolute right-0 w-52 p-1.5 border border-[#224871] rounded-md bg-[#f4f7fc] hover:bg-[#224871] hover:text-white transition-all ease-in flex items-center justify-center'>
          <ModalFormularioCategoria refresh={setRefresh}/>
        </div>
        <form className='flex flex-col md:grid lg:grid md:grid-cols-6 lg:grid-cols-6 items-center gap-8 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <div 
            className='
              w-full 
              lg:row-span-2 lg:col-span-2
              md:row-span-2 md:col-span-2
              border-[2px] h-44 border-dashed
            border-[#224871] rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
            onClick={() => document.getElementById('input-field').click()}>
            <h1 className='font-semibold text-center'>{filename}</h1>
            <input
              type='file'
              name='foto'
              accept='image/*'
              onChange={async (e) => {
                
                if (e.currentTarget.files){
                  const compresor_result = await compresor(e.currentTarget.files[0], 0.6)
                  if (compresor_result){
                    const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                    setImagen(file)
                    formik.setFieldValue('foto', file)
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
          
          <div className='w-full grid grid-cols-2 row-span-2 items-center col-start-5 col-span-2 h-full'>
            <label htmlFor='descripcion' className='text-center w-10'>Descripción: </label>
            <TextArea
              rows={7} 
              name='descripcion'
              className='col-span-2'
              placeholder="Largo máximo 50"
              maxLength={101} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />

              {formik.touched.descripcion && formik.errors.descripcion && (
                <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.descripcion}</div>
              )}
          </div>
          

          <div className='w-full grid grid-cols-2 row-start-2 col-span-2 col-start-3 items-center'>
            <label htmlFor="categoria">Categorias: </label>
            <Select
              showSearch
              placeholder="Selecciona una categoria"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={value => formik.setFieldValue('categoria', value) }
              onSearch={onSearch}
              name='categoria'
              filterOption={filterOption}
              options={categoria && categoria.map(cat => ({
                value: cat.id,
                label: cat.nombre
              }))}
            />
          </div>

          <div className='w-full grid grid-cols-2 items-center row-start-3 col-start-3 col-span-2'>
            <label htmlFor='marca' className='text-start'>Marca:</label>
            <Input
              type="text"
              name='marca'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.marca}
              className={`
              ${formik.errors.username && formik.touched.username 
                ? 'border-[2px] text-red-900' 
                : 'border-[1px] border-gray-300'}
              rounded-md p-2 mt-1 col-span-2`
              }/>
              {formik.touched.marca && formik.errors.marca && (
                <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.marca}</div>
              )}
          </div>

          <button type='submit' className='row-start-3 font-semibold col-start-5 col-span-2 text-white p-2 bg-[#224871] hover:bg-[#224871ce] rounded-md mt-5 w-full'>Agregar</button>
        </form>
      </div>
    </MaxWidthWrapper>
  )
}

export default FormularioRegistroItem
