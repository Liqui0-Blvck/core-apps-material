/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { ESTADO_OC } from '../../const/constantes'

const OrdenCompraFormulario = ({ handleSubmit, handleChange, proveedores, proveedor, isActive, setProveedor}) => {

  const [sucursales, setSucursales] = useState([])
  const [sucursal, setSucursal] = useState([])
  const [sucursalSeleccionado, setSucursalSeleccionado] = useState([])

  console.log(proveedor)

  useEffect(() => {
    const getSucursales = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/proveedor/${proveedor}/sucursales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      if (response.ok){
        setSucursales(data)
      }

    }

    getSucursales()

  }, [proveedor])

  useEffect(() => {
    const getSucursal = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/proveedor/${proveedor}/sucursales/${sucursal}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      if (response.ok){
        setSucursalSeleccionado(data)
      }

    }

    getSucursal()
  }, [sucursal])

  

  return (
    <div>
      <form className='w-full h-72 flex border' onSubmit={handleSubmit}>

        <div className='bg-gray-100 w-full grid grid-rows-8 gap-2 px-3'>
          <div className='row-span-2 w-48'>
            <img src="src/assets/logosnabbit.gif" alt="" className='w-full h-full object-contain'/>
          </div>

          <div className='row-start-4 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Nombre Orden: </label>
            <input 
              type="text" 
              name='nombre' 
              className='p-2 border-[1px] border-gray-300 rounded-md'
              onChange={handleChange}/>
          </div>

          <div className='row-start-5 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="estado_oc" className='text-start'>Estado Orden: </label>
            <select 
              name="estado_oc"
              onChange={handleChange}
              className='px-2.5'
            >
              <option value="">Selecciona un opcion:</option>
              {
                ESTADO_OC.map((estado) => (
                  <option key={estado.value} name={estado.value} value={estado.value}>{estado.label}</option>
                ))
              }
            </select>
          </div>

          <div className='row-start-6 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="numero_cotizacion" className='text-start'>Numero Cotizacion: </label>
            <input 
              type="text" 
              name='numero_cotizacion' 
              className='p-2 border-[1px] border-gray-300 rounded-md'
              onChange={handleChange}/>
          </div>

          <div className='row-start-7 w-[80%] flex gap-10 justify-between'>
            <label htmlFor="proveedor">Proveedor: </label>
            <select 
              name="proveedor"
              onChange={(e) => {
                setProveedor(e.target.value)
                handleChange(e)
              }}
              className='px-2.5'
            >
                <option value="">Selecciona un opcion:</option>
                {
                  proveedores.map((proveedor) =>  (
                      <option key={proveedor.id} name={proveedor} value={proveedor.id}>{proveedor.nombre}</option>
                    ) )
                }
            </select>
          </div>

        </div>

        <div className='bg-gray-100 w-full grid grid-rows-8 gap-2 px-3'>
          <div className='row-start-4 w-full flex gap-10 justify-between'>
            <label htmlFor="fecha_orden" className='text-start'>Fecha Orden: </label>
            <input 
              type="date" 
              name='fecha_orden' 
              className='px-2 w-[45%] border-[1px] border-gray-300 rounded-md'
              onChange={handleChange}/>
          </div>

          <div className='row-start-3 w-full flex gap-10 justify-between'>
            <label htmlFor="numero_oc" className='text-start'>Numero Orden: </label>
            <input 
              type="text" 
              name='numero_oc' 
              className='p-2 border-[1px] border-gray-300 rounded-md'
              onChange={handleChange}/>
          </div>

          <div className='row-start-5 w-full flex gap-10 justify-between'>
            <label  className='text-start'>Sucursal: </label>
            <select
              onChange={(e) => setSucursal(e.target.value)}
              name='sucursal'
              className='px-2.5'
            >
                <option value="">Selecciona un opcion:</option>
                {
                  sucursales.map((sucursal) =>  (
                      <option key={sucursal.id} name={sucursal} value={sucursal.id}>{sucursal.direccion}</option>
                    ) )
                }
            </select>
          </div>

          {/* <div className='row-span-2 row-start-7 w-full'>
            {
              isActive
                ? null
                : <button type='submit' className='p-2 bg-[#2732FF] w-full rounded-md text-white'>Agregar Items</button>
            }
          </div> */}
        </div>
      </form>

      <div className='w-full h-full flex bg-gray-100'>
        <div className='w-full grid grid-rows-5 gap-2 px-3'>
          <div className='bg-gray-800 w-full row-start-1 flex items-center justify-center'>
            <span className='text-white font-bold'>Proveedor</span>
          </div>

          <div className='row-start-3 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Proveedor: </label>
              <input 
                value=''
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>

          <div className='row-start-4 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Contacto: </label>
              <input 
                value=''
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>

          <div className='row-start-5 w-[80%] flex gap-2 justify-between'>
            <label htmlFor="nombre" className='text-start'>Nombre Orden: </label>
              <input 
                value=''
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>
        </div>

        

        <div className='w-full grid grid-rows-5 place-items-end gap-2 px-3 items-center'>
          <div className='bg-gray-800 w-full h-full row-start-1 flex items-center justify-center'>
            <span className='text-white font-bold'>Sucursal</span>
          </div>
          
          <div className='row-start-3 w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Direccion: </label>
              <input 
                value={sucursalSeleccionado.direccion}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>

          <div className='row-start-4 w-[80%] flex gap-2 justify-between items-center'>
            <label htmlFor="nombre" className='text-start'>Numero: </label>
              <input 
                value={sucursalSeleccionado.numero}
                className='p-2 border-[1px] border-gray-300 rounded-md'
                disabled/>
          </div>
          

        </div>
      </div>
      
    </div>
  )
}

export default OrdenCompraFormulario
