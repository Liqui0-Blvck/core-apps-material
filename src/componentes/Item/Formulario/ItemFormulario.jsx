import { compresor } from '@/services/compresor_imagen'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const ItemFormulario = ({ formik }) => {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)

  return (
    <form className='grid grid-cols-6 items-center gap-10 w-full h-full' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
        onClick={() => document.getElementById('input-field').click()}>
        <h1 className='font-semibold text-center'>{filename}</h1>
        <input
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
        <input
          type="text"
          name='nombre'
          onChange={formik.handleChange}
          value={formik.values.nombre}
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>
      
      <div className='grid grid-cols-2 items-center col-start-5 col-span-2'>
        <label htmlFor='rut' className='text-center w-10'>Rut: </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.rut}
          name='rut'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>
      

      <div className='grid row-start-2 col-start-3 col-span-2  items-center'>
        <label htmlFor='direccion' className='text-start'>Direccion: </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.direccion}
          name='direccion'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>

      <div className='grid row-start-2 grid-cols-2 col-span-2 col-start-5 items-center'>
        <label htmlFor='contacto' className='text-start'>Contacto: </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contacto}
          name='contacto'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>
      


      <div className='grid grid-cols-2 row-start-3 items-center  col-span-2 '>
        <label htmlFor='correo' className='text-start'>Correo: </label>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.correo}
          name='correo'
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
      </div>

      {/* <div className='grid grid-cols-2 row-start-3 col-span-2 col-start-3 items-center'>
        <label htmlFor="region">Region: </label>
          <select
          name="region"
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-3'
          // eslint-disable-next-line no-unused-expressions
          onChange={(e) => { formik.handleChange(e); handleRegion(e) }}>
          <option value="">Seleccione una categoria</option>
          {
            region && region.map((region) => (
              <option key={region.region_id} value={region.region_id}>{region.region_nombre}</option>
            ))
          }
        </select>
      </div> */}

      {/* <div className='grid grid-cols-2 row-start-3 col-span-2 col-start-5 items-center'>
        <label htmlFor="provincia">Provincia: </label>
          <select
          name="provincia"
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
          // eslint-disable-next-line no-unused-expressions
          onChange={(e) => { formik.handleChange(e); setProvinciaID(e.target.value) }}>
          <option value="">Seleccione una categoria</option>
          {
            provincia && provincia.map((provincia) => (
              <option key={provincia.provincia_id} value={provincia.provincia_id}>{provincia.provincia_nombre}</option>
            ))
          }
        </select>
      </div> */}

      {/* <div className='grid grid-cols-2 col-span-2 items-center'>
        <label htmlFor="comuna">Comuna: </label>
        <select
          name="comuna"
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
          // eslint-disable-next-line no-unused-expressions
          onChange={(e) => formik.handleChange(e)}>
          <option value="">Seleccione una categoria</option>
          {
            comuna && comuna.map((comuna) => (
              <option key={comuna.comuna_id} value={comuna.comuna_id}>{comuna.comuna_nombre}</option>
            ))
          }
        </select>        
      </div> */}

        <button type='submit' className='row-start-4 col-start-4 col-span-3  p-2 bg-blue-200 rounded-md mt-5 w-full'>Agregar</button>
    </form>
  )
}

export default ItemFormulario
