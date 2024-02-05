/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { ESTADO_OC } from '../../../const/constantes'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const FormHeader = ({ formik, proveedores, proveedor  , setProveedor}) => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [sucursal, setSucursal] = useState([])
  const { data: sucursales } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/${proveedor}/sucursales`
  )

  const { data: sucursalSeleccionado } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/${proveedor}/sucursales/${sucursal}`
  )

    
  const proveedorSeleccionado = proveedores && proveedores.filter(pro => pro.id === Number(proveedor))
   
  return (
    <div className='mb-5 overflow-hidden'>
      <form className='w-full full flex xl:flex-row lg:flex-row md:flex-row flex-col border' onSubmit={formik.handleSubmi}>

        {/* // Part de la izquierda del documento */}
        <div className='bg-gray-100 w-[80%] md:w-full grid grid-rows-8 gap-2'>
          <div className='row-span-1 w-48'>
            <img src="/img/logosnabbit.gif" alt="" className='w-full h-full object-contain'/>
          </div>

          <div className='row-start-4  w-full md:w-[80%] flex gap-3 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Nombre Orden: </label>
            <input 
              type="text" 
              name='nombre' 
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md'
              onChange={formik.handleChange}/>
          </div>

          <div className='row-start-6 w-full md:w-[80%]  flex gap-2 justify-between items-center'>
            <label htmlFor="numero_cotizacion" className='text-start'>Numero Cotizacion: </label>
            <input 
              type="text" 
              name='numero_cotizacion' 
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md'
              onChange={formik.handleChange}/>
          </div>

          <div className='row-start-7 w-[95%] md:w-[80%] flex gap-10 justify-between items-center'>
            <label htmlFor="proveedor">Proveedor: </label>
            <select 
              name="proveedor"
              onChange={(e) => {
                setProveedor(e.target.value)
                formik.handleChange(e)
              }}
              className='md:px-2.5 h-10 rounded-md'
            >
                <option value="">Selecciona un opcion:</option>
                {
                  proveedores && proveedores.map((proveedor) =>  (
                      <option key={proveedor.id} name={proveedor} value={proveedor.id}>{proveedor.nombre}</option>
                    ) )
                }
            </select>
          </div>

        </div>

        {/* // Parte derecha del documento */}

        <div className='bg-gray-100 w-full grid grid-rows-8 gap-2'>
          <div className='row-start-4 w-full flex gap-10 justify-between items-center'>
            <label htmlFor="fecha_orden" className='text-start'>Fecha Orden: </label>
            <input 
              type="date" 
              name='fecha_orden' 
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md'
              onChange={formik.handleChange}/>
          </div>

          <div className='row-start-3 w-full flex gap-10 justify-between items-center'>
            <label htmlFor="numero_oc" className='text-start'>Numero Orden: </label>
            <input 
              type="text" 
              name='numero_oc' 
              className='px-2 h-10 border-[1px] border-gray-300 rounded-md'
              onChange={formik.handleChange}/>
          </div>

          <div className='row-start-5 w-full flex gap-10 justify-between '>
            <label  className='text-start'>Sucursal: </label>
            <select
              onChange={(e) => setSucursal(e.target.value)}
              name='sucursal'
              className='md:px-2.5 h-10'
            >
                <option value="">Selecciona un opcion:</option>
                {
                  sucursales && sucursales.map((sucursal) =>  (
                      <option key={sucursal.id} name={sucursal} value={sucursal.id}>{sucursal.direccion}</option>
                    ) )
                }
            </select>
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
                disabled/>
          </div>

          <div className='lg:row-start-4 lg:w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Contacto: </label>
              <input 
                value={proveedorSeleccionado && proveedorSeleccionado.contacto}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>

          <div className='lg:row-start-5 lg:w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Correo: </label>
              <input 
                value={proveedorSeleccionado && proveedorSeleccionado.correo}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
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
                disabled/>
          </div>

          <div className='lg:row-start-4 lg:w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Dirección: </label>
              <input 
                value={sucursalSeleccionado && sucursalSeleccionado.direccion}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>

          <div className='lg:row-start-5 lg:w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Region: </label>
              <input 
                value={sucursalSeleccionado && sucursalSeleccionado.region_nombre}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>
          

        </div>
      </div>
      
    </div>
  )
}

export default FormHeader
