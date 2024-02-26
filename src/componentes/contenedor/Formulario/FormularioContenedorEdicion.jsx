import React, { useEffect, useState } from 'react'
import { ESTADOS } from '@/const/constantes'
import { compresor } from '@/services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import { useAuth } from '@/context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { urlNumeros } from '@/services/url_number'
import { ContenedorSchema } from '@/services/Validator'
import toast from 'react-hot-toast'

const FormularioContenedorEdicion = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const [prevEstado, setPrevEstado] = useState('')
  const [filename, setFilename] = useState('')
  const [imagen, setImagen] = useState(null)
  const base_url = import.meta.env.VITE_BASE_URL
  const id = urlNumeros(pathname)
  const navigate = useNavigate()

  const { data: contenedor } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/contenedor/${id}`
    )

  const formik = useFormik({
    initialValues: {
      nombre: '',
      color: '',
      dimensiones: '',
      material: '',
      estado: '',
      foto: null
    },
    validationSchema: ContenedorSchema,
    onSubmit: async values => {
      try {
        const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('color', values.color);
          formData.append('dimensiones', values.dimensiones);
          formData.append('material', values.material);
          formData.append('estado', values.estado);
          if (values.foto instanceof File) {
            formData.append('foto', values.foto);
          }
          
          const response = await fetch(`${base_url}/api/contenedor/${id}/`, {
            method: 'PUT',
            headers: {
              'authorization': `Bearer ${authTokens.access}`
            },
            body: formData,
          });

          if (response.ok) {  
            toast.success('Contenedor modificado correctamente!');
            navigate('/app/contenedores/')
            formik.setValues(formik.initialValues)
            setImagen(null)
            setNombreCategoria('')
          } else {
            toast.error('Error al modificar el contenedor, ¡Vuelve a intentarlo!');
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

  useEffect(() => {
    let isMounted = true
    if(contenedor && isMounted){
      formik.setValues({
        nombre: contenedor.nombre,
        color: contenedor.color,
        dimensiones: contenedor.dimensiones,
        material: contenedor.material,
        estado: contenedor.estado,
        foto: contenedor.foto
      })
      
      setPrevEstado(contenedor.estado)
    }

    return () => {
      isMounted = false
    }
  }, [contenedor])

  return (
    <MaxWidthWrapper>
    <div className='flex items-center justify-center mt-10'>
      <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
        
        <form className='grid grid-cols-6 items-center gap-10 w-full h-full p-4' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <div 
          className='row-span-2 col-span-2 border-[2px] h-44 border-dashed bg-white border-[#224871] rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
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
                    formik.setFieldValue('foto', null); 
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
              {
                formik.errors.nombre && formik.touched.nombre && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.nombre}</p>
                )
              }
          </div>
          
          <div className='grid grid-cols-2 items-center col-start-5 col-span-2'>
            <label htmlFor='color' className='text-center w-10'>Color: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.color}
              name='color'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
              {
                formik.errors.color && formik.touched.color && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.color}</p>
                )
              }
          </div>
          

          <div className='grid row-start-2 col-start-3 col-span-2  items-center'>
            <label htmlFor='dimensiones' className='text-start'>Dimensiones: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.dimensiones}
              name='dimensiones'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
              {
                formik.errors.dimensiones && formik.touched.dimensiones && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.dimensiones}</p>
                )
              }
          </div>

          <div className='grid grid-cols-2 row-start-2 col-span-2 col-start-5 items-center'>
            <label htmlFor="estado">Estado: </label>
            <Select
              showSearch
              placeholder="Selecciona un estado"
              optionFilterProp="children"
              className='rounded-md mt-1 col-span-3 h-11 w-full'
              onChange={e => {formik.setFieldValue('estado', e), setPrevEstado(e)}}
              onSearch={onSearch}
              name='estado'
              filterOption={filterOption}
              value={prevEstado}
              options={ESTADOS.map((estado) => ({
                value: estado,
                label: estado
              }))}
            />
              {
                formik.errors.estado && formik.touched.estado && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.estado}</p>
                )
              }
          </div>

          <div className='grid grid-cols-2 row-start-3 col-start-3 col-span-2 items-center'>
            <label htmlFor='material' className='text-start'>material: </label>
            <Input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.material}
              name='material'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
              {
                formik.errors.material && formik.touched.material && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.material}</p>
                )
              }
          </div>
          <div className='w-full relative row-start-3 col-start-5 col-span-2 '>
            <button type='submit' className='row-start-3 font-semibold col-start-5 col-span-2 text-white p-2 bg-[#224871] hover:bg-[#224871ce] rounded-md mt-7 w-full'>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  </MaxWidthWrapper>
  )
}

export default FormularioContenedorEdicion
