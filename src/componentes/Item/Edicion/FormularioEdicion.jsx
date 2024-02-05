import { compresor } from '@/services/compresor_imagen'
import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import AuthContext from '@/context/AuthContext';
import { ComponenteSchema } from '@/services/Validator';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const FormularioEdicion = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [filename, setFilename] = useState('')
  const [imagen, setImagen] = useState(null)


  const { data: categoria, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/categoria/'
    )

  const { data: item } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/item/${pathname.slice(-2)}`
    )

  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      categoria: '',
      foto: '',
    },
    validationSchema: ComponenteSchema,
    onSubmit: async (values) => {
  
      // Crear un FormData para enviar el archivo correctamente
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('categoria', values.categoria);
      formData.append('foto', values.foto);
  
      try {
        const response = await fetch(`http://localhost:8000/api/item/${pathname.slice(-2)}/`, {
          method: 'PUT',
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

  c  

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className='my-16'>
      <form className='grid grid-cols-6 items-center gap-8 w-full h-full' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
          className='row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
          onClick={() => document.getElementById('input-field').click()}
        >
          <h1 className='font-semibold text-center'>{filename}</h1>
          <input
            type='file'
            name='foto'
            accept='image/*'
            onChange={async (e) => {
              if (e.currentTarget.files) {
                const compresor_result = await compresor(e.currentTarget.files[0], 0.6);
                if (compresor_result) {
                  const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp' });
                  formik.setFieldValue('foto', file);
                  setImagen(file);
                }
              }
            }}
            className='hidden'
            id='input-field'
          />

          {formik.values.foto && (
            <>
              <div className='absolute h-7 w-7 bg-red-800 rounded-full flex justify-center items-center -right-2 -top-2 cursor-pointer z-20'>
                <IoMdClose 
                  className='absolute text-2xl text-white z-100'
                  onClick={() => {
                    formik.setFieldValue('foto', null); // Limpiar el valor del campo 'foto'
                    setImagen(null);
                  }}
                />
              </div>
              {
                imagen
                  ? (
                    <img
                      src={URL.createObjectURL(imagen)}
                      alt=""
                      className='z-10 absolute w-full h-full object-contain rounded-md first-letter:'
                    />
                    )
                  : (
                    <img
                      src={formik.values.foto}
                      alt=""
                      className='z-10 absolute w-full h-full object-contain rounded-md first-letter:'
                    />
                    )
              }

            </>
          )}
        </div>


        <div className='grid grid-cols-2 items-center col-start-3 col-span-2'>
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
        
        <div className='grid grid-cols-2 row-span-2 items-center col-start-5 col-span-2 h-full'>
          <label htmlFor='descripcion' className='text-center w-10'>Descripción: </label>
          <TextArea
            rows={7} 
            name='descripcion'
            className='col-span-2'
            placeholder="Largo máximo 50"
            maxLength={101} 
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.descripcion}</div>
            )}
        </div>
        

        <div className='grid grid-cols-2 row-start-2 col-span-2 col-start-3 items-center'>
          <label htmlFor="categoria">Categorias: </label>
          <Select
            showSearch
            placeholder="Selecciona una categoria"
            optionFilterProp="children"
            className='rounded-md mt-1 col-span-3 h-11 w-full'
            onChange={value => formik.setFieldValue('categoria', value) }
            onSearch={onSearch}
            name='categoria'
            values={formik.values.categoria}
            filterOption={filterOption}
            options={categoria && categoria.map(cat => ({
              value: cat.id,
              label: cat.nombre
            }))}
          />
        </div>

        <button type='submit' className='row-start-3 col-start-5 col-span-2  p-2 bg-blue-200 rounded-md mt-5 w-full'>Agregar</button>
      </form>
    </div>
  )
}

export default FormularioEdicion
