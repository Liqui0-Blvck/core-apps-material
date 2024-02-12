import { compresor } from '@/services/compresor_imagen'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Input, Select } from 'antd';

const ProveedorFormulario = ({ formik, region, comuna, provincia, setRegionID, setProvinciaID }) => {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)

  const handleRegion = ({ target }) => {
    const { value } = target
    setRegionID(value)
  }


  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <form className='flex flex-col md:grid lg:grid md:grid-cols-6 lg:grid-cols-6 items-center gap-10 w-full h-full mt-5 mb-20' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='w-full row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
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

      <div className='w-full grid grid-cols-2 items-center col-start-3 col-span-2'>
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
      
      <div className='w-full grid grid-cols-2 items-center col-start-5 col-span-2'>
        <label htmlFor='rut' className='text-center w-10'>Rut: </label>
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.rut}
          name='rut'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          {
            formik.errors.rut && formik.touched.rut && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.rut}</p>
            )
          }
      </div>
      

      <div className='w-full grid row-start-2 col-start-3 col-span-2  items-center'>
        <label htmlFor='direccion' className='text-start'>Direccion: </label>
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.direccion}
          name='direccion'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          {
            formik.errors.direccion && formik.touched.direccion && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.direccion}</p>
            )
          }
      </div>

      <div className='w-full grid row-start-2 grid-cols-2 col-span-2 col-start-5 items-center'>
        <label htmlFor='contacto' className='text-start'>Contacto: </label>
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contacto}
          name='contacto'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          {
            formik.errors.contacto && formik.touched.contacto && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.contacto}</p>
            )
          }
      </div>
      


      <div className='w-full grid grid-cols-2 row-start-3 items-center  col-span-2 '>
        <label htmlFor='correo' className='text-start'>Correo: </label>
        <Input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.correo}
          name='correo'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          {
            formik.errors.correo && formik.touched.correo && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.correo}</p>
            )
          }
      </div>

      <div className='w-full grid grid-cols-2 row-start-3 col-span-2 col-start-3 items-center'>
        <label htmlFor="region">Region: </label>
        <Select
          showSearch
          placeholder="Selecciona una región"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={value => {setRegionID(value), formik.setFieldValue('region', value)} }
          onSearch={onSearch}
          name='region'
          filterOption={filterOption}
          options={region && region.map(item => ({
            value: item.region_id,
            label: item.region_nombre
          }))}
        />
        {
            formik.errors.region && formik.touched.region && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.region}</p>
            )
          }
      </div>

      <div className='w-full grid grid-cols-2 row-start-3 col-span-2 col-start-5 items-center'>
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
          options={provincia && provincia.map(item => ({
            value: item.provincia_id,
            label: item.provincia_nombre
          }))}
        />
        {
            formik.errors.provincia && formik.touched.provincia && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.provincia}</p>
            )
          }
      </div>

      <div className='w-full grid grid-cols-2 col-span-2 items-center'>
        <label htmlFor="comuna">Comuna: </label>
        <Select
          showSearch
          placeholder="Selecciona una provincia"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={value => {formik.setFieldValue('comuna', value)}}
          name='comuna'
          onSearch={onSearch}
          filterOption={filterOption}
          options={comuna && comuna.map(item => ({
            value: item.comuna_id,
            label: item.comuna_nombre
          }))}
        />
        {
            formik.errors.comuna && formik.touched.comuna && (
              <p className='text-red-600 text-center w-full col-span-2'>{formik.errors.comuna}</p>
            )
          }
        
      </div>

      <div className='w-full relative col-start-3 col-span-2 '>
        <button 
          type='submit' 
          className='
            absolute -top-1 col-start-3 col-span-3 p-2
          bg-blue-400 hover:bg-blue-300
          text-white rounded-md w-full'
          >Agregar</button>
      </div>
    </form>
  )
}

export default ProveedorFormulario
