import React, { useContext, useEffect, useState } from 'react'
import { ESTADOS } from '@/const/constantes'
import { compresor } from '@/services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import AuthContext from '@/context/AuthContext'
import { useLocation } from 'react-router-dom'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { urlNumeros } from '@/services/url_number'

const FormularioContenedorEdicion = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [filename, setFilename] = useState('')
  const [imagen, setImagen] = useState(null)
  const id = urlNumeros(pathname)

  const { data: contenedor } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/contenedor/${id}`
    )

  const formik = useFormik({
    initialValues: {
      nombre: '',
      color: '',
      dimensiones: '',
      tipo: '',
      estado: '',
      foto: null
    },
    onSubmit: async values => {
      try {
        if (values.foto instanceof File) {
          const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('color', values.color);
          formData.append('dimensiones', values.dimensiones);
          formData.append('tipo', values.tipo);
          formData.append('estado', values.estado);
          formData.append('foto', values.foto);

          const response = await fetch(`http://localhost:8000/api/contenedor/${id}/`, {
            method: 'PUT',
            headers: {
              'authorization': `Bearer ${authTokens.access}`
            },
            body: formData,
          });

          if (response.ok) {  
            toast.success('Contenedor añadido correctamente!');
            formik.setValues(formik.initialValues)
            setImagen(null)
            setNombreCategoria('')

            setTimeout(() => {
              navigate('/app/contenedores')
            }, 2000)

          } else {
            toast.error('Error al añadir el contenedor');
          }
        } else {
          const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('color', values.color);
          formData.append('dimensiones', values.dimensiones);
          formData.append('tipo', values.tipo);
          formData.append('estado', values.estado)

          const response = await fetch(`http://localhost:8000/api/contenedor/${id}/`, {
            method: 'PUT',
            headers: {
              'authorization': `Bearer ${authTokens.access}`
            },
            body: formData,
          });

          if (response.ok) {  
            toast.success('Contenedor añadido correctamente!');
            formik.setValues(formik.initialValues)
            setImagen(null)
            setNombreCategoria('')

            setTimeout(() => {
              navigate('/app/contenedores')
            }, 2000)

          } else {
            toast.error('Error al añadir el contenedor');
          }
        }
      } catch (error) {
        
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

  useEffect(() => {
    let isMounted = true
    if(contenedor && isMounted){
      formik.setValues({
        nombre: contenedor.nombre,
        color: contenedor.color,
        dimensiones: contenedor.dimensiones,
        tipo: contenedor.tipo,
        estado: contenedor.estado,
        foto: contenedor.foto
      }); 
    }

    return () => {
      isMounted = false
    }
  }, [contenedor])



  return (
    <MaxWidthWrapper>
    <div className='flex flex-col items-center h-full mt-20'>
      <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
        <h1 className='text-center font-semibold text-2xl'>Contenedor</h1>
        
        <form className='grid grid-cols-6 items-center gap-10 w-full h-full p-4' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
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
              value={formik.values.nombre}
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          </div>
          
          <div className='grid grid-cols-2 items-center col-start-5 col-span-2'>
            <label htmlFor='color' className='text-center w-10'>Color: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.color}
              name='color'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          </div>
          

          <div className='grid row-start-2 col-start-3 col-span-2  items-center'>
            <label htmlFor='dimensiones' className='text-start'>Dimensiones: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.dimensiones}
              name='dimensiones'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          </div>

          <div className='grid grid-cols-2 row-start-2 col-span-2 col-start-5 items-center'>
            <label htmlFor="estado">Estado: </label>
            <Select
              showSearch
              placeholder="Selecciona un estado"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={e => formik.setFieldValue('estado', e)}
              onSearch={onSearch}
              name='estado'
              filterOption={filterOption}
              options={ESTADOS.map((estado) => ({
                value: estado,
                label: estado
              }))}
            />
          </div>

          <div className='grid grid-cols-2 row-start-3 col-start-3 col-span-2 items-center'>
            <label htmlFor='tipo' className='text-start'>Tipo: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tipo}
              name='tipo'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          </div>

          {/* <div className='grid grid-cols-2 row-start-3 col-span-2 items-center'>
            <label htmlFor="provincia">Provincia: </label>
            <Select
              showSearch
              placeholder="Selecciona una provincia"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={value => {setProvinciaID(value), formik.setFieldValue('provincia', value)}}
              onSearch={onSearch}
              name='provincia'
              defaultActiveFirstOption={false}
              filterOption={filterOption}
              // options={provincia && provincia.map(item => ({
              //   value: item.provincia_id,
              //   label: item.provincia_nombre
              // }))}
            />
          </div> */}

          <div className='w-full relative row-start-3 col-start-5 col-span-2 '>
            <button type='submit' className='absolute -top-1 col-start-3 col-span-3 p-2 bg-blue-400 text-white rounded-md w-full'>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  </MaxWidthWrapper>
  )
}

export default FormularioContenedorEdicion
