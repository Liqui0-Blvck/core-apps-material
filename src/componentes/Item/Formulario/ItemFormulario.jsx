import { compresor } from '@/services/compresor_imagen'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';

const { TextArea } = Input;

const ItemFormulario = ({ formik, categoria }) => {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  


  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <form className='flex flex-col md:grid lg:grid md:grid-cols-6 lg:grid-cols-6 items-center gap-8 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='
          w-full 
          lg:row-span-2 lg:col-span-2
          md:row-span-2 md:col-span-2
          border-[2px] h-44 border-dashed
        border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
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

      <button type='submit' className='row-start-3 col-start-5 col-span-2  p-2 bg-blue-400 hover:bg-blue-300 rounded-md mt-5 w-full'>Agregar</button>
    </form>
  )
}

export default ItemFormulario
