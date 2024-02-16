import React, { useState } from 'react'
import { ESTADOS } from '@/const/constantes'
import { compresor } from '@/services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ContenedorSchema } from '@/services/Validator'
import { useAuth } from '@/context/AuthContext'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import toast from 'react-hot-toast'

const FormularioRegistroContenedor = () => {
  const { authTokens } = useAuth()
  const [imagen, setImagen] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      color: '',
      dimensiones: '',
      material: '',
      estado: '',
      foto: null,
      espacio: null
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
            formData.append('espacios', values.espacio)

            const response = await fetch('http://localhost:8000/api/contenedores/', {
              method: 'POST',
              headers: {
                'authorization': `Bearer ${authTokens.access}`
              },
              body: formData,
            });

            if (response.ok) {  
              toast.success('Contenedor añadido correctamente!');
              navigate('/app/contenedores/')
              formik.setValues(formik.initialValues)
              setImagen(null)
              setNombreCategoria('')
  

            } else {
              toast.error('Error al añadir el contenedor');
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

  console.log(formik.values)
  return (
    <MaxWidthWrapper>
      <div className='flex items-center justify-center mt-10'>
        <form className='grid grid-cols-6 items-center gap-10 w-full h-full p-4' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <div 
            className='row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
            onClick={() => document.getElementById('input-field').click()}>
            <h1 className='font-semibold text-center'>{filename}</h1>
            <Input
              type='file'
              name='foto'
              accept='image/*'
              onChange={async (e) => {
                
                if (e.currentTarget.files){
                  const compresor_result = await compresor(e.currentTarget.files[0], 0.9)
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

          <div className='grid grid-cols-2 items-center col-start-3 col-span-2'>
            <label htmlFor='nombre' className='text-start'>Nombre:</label>
            <Input
              type="text"
              name='nombre'
              onChange={formik.handleChange}
              value={formik.values.nombre}
              className={`border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2 `}/>
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
              onChange={e => formik.setFieldValue('estado', e)}
              onSearch={onSearch}
              name='estado'
              filterOption={filterOption}
              options={ESTADOS.map((estado) => ({
                value: estado,
                label: estado
              }))}
            />
            {
                formik.errors.material && formik.touched.material && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.material}</p>
                )
              }
          </div>

          <div className='grid grid-cols-2 row-start-3 col-start-3 col-span-2 items-center'>
            <label htmlFor='material' className='text-start'>Material: </label>
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

          <div className='grid grid-cols-2 row-start-3  col-span-2 items-center'>
            <label htmlFor='espacio' className='text-start'>Espacios: </label>
            <Input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.espacio}
              name='espacio'
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
              {
                formik.errors.espacio && formik.touched.espacio && (
                  <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.espacio}</p>
                )
              }
          </div>

          <div className='w-full relative row-start-3 col-start-5 col-span-2 '>
            <button type='submit' className='absolute -top-1 col-start-3 col-span-3 p-2 bg-blue-400 hover:bg-blue-300 text-white rounded-md w-full'>Agregar</button>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
    
  )
}

export default FormularioRegistroContenedor
