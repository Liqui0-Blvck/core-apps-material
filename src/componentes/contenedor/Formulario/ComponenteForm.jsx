import React from 'react'
import { ESTADOS } from '@/const/constantes'
import { compresor } from '@/services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd'

const ComponenteForm = ({ formik, filename, imagen, setImagen, setFilename }) => {
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
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

      <div className='grid grid-cols-2 row-start-3  col-span-2 items-center'>
        <label htmlFor='espacio' className='text-start'>Espacios: </label>
        <Input
          type="number"
          onChange={formik.handleChange}
          value={formik.values.espacios}
          name='espacio'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>

      <div className='w-full relative row-start-3 col-start-5 col-span-2 '>
        <button type='submit' className='absolute -top-1 col-start-3 col-span-3 p-2 bg-blue-400 text-white rounded-md w-full'>Agregar</button>
      </div>
    </form>
  )
}

export default ComponenteForm
