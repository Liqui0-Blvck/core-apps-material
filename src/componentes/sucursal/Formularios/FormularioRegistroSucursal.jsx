import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const FormularioRegistroSucursal = ({ id, modalClose }) => {
  const { authTokens, validToken } = useAuth()
  const [regionID, setRegionID] = useState(null)
  const [provinciaID, setProvinciaID] = useState(null)
  const { data: region } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/regiones/`
  )
  const {data: provincia} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/region/${regionID}/provincias`
  )

  const { data: comuna } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/provincias/${provinciaID}/comunas`
  )

  const formik = useFormik({
    initialValues: {
      direccion: "",
      numero: "",
      comuna: null,
      region: null,
      provincia: null,
      nombre: ""
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sucursal/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values,
            proveedor: id[0],
            numero: Number(urlNumeros(values.direccion))
          })
        })

        if (response.ok){
          toast.success('Sucursal creada correctamente!')
          modalClose(false)
        } else {
          toast.error('No se pudo crear la sucursal, ¡vuelve a intentarlo!')
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
    <form className='flex flex-col md:grid lg:grid md:grid-cols-4 lg:grid-cols-4 items-center gap-x-5 gap-y-3 w-full h-full my-5' onSubmit={formik.handleSubmit}>

      <div className='w-full grid grid-cols-2 items-center col-span-2'>
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

      <div className='w-full grid col-start-3 col-span-2  items-center'>
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

      <div className='w-full grid grid-cols-2 row-start-2  col-span-2 items-center'>
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
      


      <div className='w-full grid grid-cols-2 row-start-2 col-start-3 items-center  col-span-2 '>
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

      <div className='w-full grid grid-cols-2 row-start-3 col-span-2 items-center'>
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

      <div className='w-full grid grid-cols-2 row-start-3 col-span-2 col-start-3 items-center'>
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
            bg-[#224871] hover:bg-[#224871ad]
          text-white rounded-md w-full'
          >Agregar</button>
      </div>
    </form>
  )
}

export default FormularioRegistroSucursal
