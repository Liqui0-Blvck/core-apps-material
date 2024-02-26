/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useAuth } from '@/context/AuthContext'
import { Select } from 'antd'
import { format } from '@formkit/tempo'


const HeaderFormularioRegistro = ({ formik }) => {
  const { authTokens, validToken } = useAuth()
  const [proveedor, setProveedor] = useState(null)
  const [sucursal, setSucursal] = useState(null)
  const { data: proveedores } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/`
  )


  const { data: sucursales } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/${formik.values.proveedor}/sucursales`
  )

  const { data: sucursalSeleccionado } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/${formik.values.proveedor}/sucursales/${formik.values.sucursal}`
  )

  const proveedorSeleccionado = proveedores && proveedores.find(pro => pro.id === Number(formik.values.proveedor))

  const algo = sucursales && sucursales.find(sucur => sucur.id === formik.values.sucursal)?.nombre

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    let isMounted = true

    if (proveedor && sucursal && isMounted) {
      setProveedor(formik.values.proveedor)
      setSucursal(formik.values.sucursal)
    }

    return () => {
      isMounted = false
    }
  }, [proveedor, sucursal])


  return (
    <section className='mb-5 overflow-hidden'>
      <form className='w-full full flex xl:flex-row lg:flex-row md:flex-row flex-col'>

        {/* // Part de la izquierda del documento */}
        <div className='bg-gray-100 w-full lg:w-[80%] grid grid-rows-8 gap-2'>
          <div className='row-span-1 w-48'>
            <img src="/img/logosnabbit.gif" alt="" className='w-full h-full object-contain' />
          </div>

          <div className='row-start-4  w-full md:w-[80%] flex gap-3 md:gap-6 justify-between items-center'>
            <label htmlFor="nombre" className='text-start md:pr-1 w-20'>Nombre Orden: </label>
            <input
              type="text"
              name='nombre'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-6/12 md:w-full w-8/12'
              onChange={formik.handleChange}
              value={formik.values.nombre} />
          </div>

          <div className='row-start-6 w-full md:w-[80%]  flex gap-3 justify-between items-center'>
            <label htmlFor="numero_cotizacion" className='text-start w-20'>Numero Cotizacion: </label>
            <input
              type="text"
              name='numero_cotizacion'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-6/12 md:w-full w-8/12'
              onChange={formik.handleChange}
              value={formik.values.numero_cotizacion} />
          </div>

          <div className='row-start-7 w-full md:w-[80%] flex lg:gap-3 gap-2 justify-between items-center'>
            <label htmlFor="proveedor" className='pr-10 md:pr-2 w-20'>Proveedor: </label>
            <Select
              showSearch
              placeholder="Selecciona una proveedor"
              optionFilterProp="children"
              className='rounded-md mt-2 col-span-3 h-10 lg:w-6/12 md:w-full w-8/12'
              onChange={value => { formik.setFieldValue('proveedor', value), setProveedor(value) }}
              onSearch={onSearch}
              name='proveedor'
              filterOption={filterOption}
              options={proveedores && proveedores.map(proveedor => ({
                value: proveedor.id,
                label: proveedor.nombre
              }))}
              value={formik.values.proveedor}
            />
          </div>

        </div>

        {/* // Parte derecha del documento */}

        <div className='bg-gray-100 w-full lg:w-[80%] grid grid-rows-8 gap-3'>
          <div className='row-start-4 flex gap-3 justify-between items-center'>
            <label htmlFor="fecha_orden" className='text-start w-20'>Fecha Orden: </label>
            <input
              type='date'
              name='fecha_orden'
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md lg:w-6/12 md:w-full w-8/12'
              onChange={formik.handleChange} />
          </div>

          <div className='row-start-3 w-full flex gap-3 justify-between items-center'>
            <label htmlFor="numero_oc" className='text-start w-20'>Numero Orden: </label>
            <input
              type="text"
              name='numero_oc'
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md lg:w-6/12 md:w-full w-8/12'
              onChange={formik.handleChange}
              value={formik.values.numero_oc} />
          </div>

          <div className='row-start-5 w-full items-center flex gap-3 justify-between '>
            <label className='text-start pr-10 md:pr-2 w-20'>Sucursal: </label>
            <Select
              showSearch
              placeholder="Selecciona una sucursal"
              optionFilterProp="children"
              className='rounded-md mt-2 col-span-3 h-10 lg:w-6/12 md:w-full w-8/12'
              onChange={value => { formik.setFieldValue('sucursal', value), setSucursal(value) }}
              onSearch={onSearch}
              name='sucursal'
              filterOption={filterOption}
              options={sucursales && sucursales.map(sucursal => ({
                value: sucursal.id,
                label: sucursal.nombre
              }))}
              value={sucursales && sucursales.find(sucur => sucur.id === formik.values.sucursal)?.nombre}
            />
          </div>

        </div>
      </form>

      <div className='w-full h-full flex xl:flex-row lg:flex-row md:flex-row flex-col bg-gray-100 mt-10'>
        <div className='w-full grid grid-rows-5 gap-2 px-3'>
          <div className='bg-gray-800 w-full row-start-1 flex items-center justify-center'>
            <span className='text-white font-bold'>Proveedor</span>
          </div>

          <div className='lg:row-start-3 lg:w-[80%] flex items-center gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Proveedor: </label>
            <input
              value={proveedorSeleccionado && proveedorSeleccionado.nombre}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>

          <div className='lg:row-start-4 lg:w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Contacto: </label>
            <input
              value={proveedorSeleccionado && proveedorSeleccionado.contacto}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>

          <div className='lg:row-start-5 lg:w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Correo: </label>
            <input
              value={proveedorSeleccionado && proveedorSeleccionado.correo}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>
        </div>



        <div className='w-full grid grid-rows-5 lg:place-items-end gap-2 px-3 items-center'>
          <div className='bg-gray-800 w-full h-full row-start-1 flex items-center justify-center'>
            <span className='text-white font-bold'>Sucursal</span>
          </div>

          <div className='lg:row-start-3 lg:w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Nombre: </label>
            <input
              value={sucursalSeleccionado && sucursalSeleccionado.nombre}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>

          <div className='lg:row-start-4 lg:w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Dirección: </label>
            <input
              value={sucursalSeleccionado && sucursalSeleccionado.direccion}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>

          <div className='lg:row-start-5 lg:w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Region: </label>
            <input
              value={sucursalSeleccionado && sucursalSeleccionado.region_nombre}
              className='p-2 border-[1px] border-gray-300 rounded-md'
              disabled />
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeaderFormularioRegistro
