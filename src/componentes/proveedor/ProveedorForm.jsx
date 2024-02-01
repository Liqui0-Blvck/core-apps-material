/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useFormik, ErrorMessage } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material'
import AuthContext from '@/context/AuthContext'


const ProveedorForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [idProveedor, setIDProveedor] = useState(null)
  const navigate = useNavigate()
  const [region, setRegion] = useState(null)
  const [regionID, setRegionID] = useState(null)

  useEffect(() => {
    let isMounted = true

    if (authTokens){
      console.log("si hay token")
      const fetchData = async () => {
        try {
          const isValidToken = await validToken(authTokens)
  
          if (!isMounted) return 
  
          if (!isValidToken) {
            navigate('/auth/sign-in/');

          } else {

            const responseRegion = await fetch('http://127.0.0.1:8000/api/regiones/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })

            if (responseRegion){
              const data = await responseRegion.json()
              setRegion(data)
            }

          }

        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
    }
  }, [authTokens])


  const formikProveedor = useFormik({
    initialValues: {
      nombre: '',
      rut: '',
      correo: '',
      contacto: '',
      direccion: ''
    },
    onSubmit: async values => {
      const response = await fetch('http://localhost:8000/api/proveedor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${authTokens.access}`
        },
        body: JSON.stringify({ ...values })
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Proveedor agregado correctamente')
        setIDProveedor(data.id)
      } else {
        toast.error('Cualquier error es tu culpa')
      }
    }
  })

  const formikSucursal = useFormik({
    initialValues: {
      "direccion": "",
      "numero": "",
      "comuna": null,
      "region": null,
      "provincia": null,
      "proveedor": null
    },
    onSubmit: async values => {
      const response = await fetch('http://localhost:8000/api/proveedor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values })
      })

      if (response.ok) {
        toast.success('Muy bien cachulo')
        navigate('/item')
      } else {
        toast.error('Cualquier error es tu culpa')
      }
    }
  })



  const handleRegion = ({ target}) => {
    const { name, value } = target

    setRegionID(value)
  }

  console.log(regionID)

  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex flex-col items-center h-full mt-14' >

      <div className='w-full h-full mx-auto justify-center grid lg:grid-cols-2 place-items-center overflow-hidden'>
      
        <form className='grid grid-cols-4 items-center w-96 h-full' onSubmit={formikProveedor.handleSubmit}>
          <div className='col-start-2 col-span-3'>
            <h1 className='mb-10 text-center font-semibold text-2xl'>Proveedor</h1>

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='nombre' className='text-start'>Nombre:</label>
              <input
                type="text"
                name='nombre'
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.nombre}
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
            
            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='rut' className='text-center w-10'>Rut: </label>
              <input
                type="text"
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.rut}
                name='rut'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
            

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='correo' className='text-start'>Correo: </label>
              <input
                type="text"
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.correo}
                name='correo'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid grid-cols-3 items-center'>
            <label htmlFor='contacto' className='text-start'>Contacto: </label>
              <input
                type="text"
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.contacto}
                name='contacto'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='direccion' className='text-start'>Direccion: </label>
              <input
                type="text"
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.direccion}
                name='direccion'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
          </div>


          <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 col-start-2 col-span-2'>Agregar</button>

        </form>

        <form onSubmit={formikSucursal.handleSubmit}>
            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='direccion' className='text-start'>Direccion: </label>
              <input
                type="text"
                onChange={formikSucursal.handleChange}
                value={formikSucursal.values.direccion}
                name='direccion'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='direccion' className='text-start'>Direccion: </label>
              <input
                type="text"
                onChange={formikSucursal.handleChange}
                value={formikSucursal.values.direccion}
                name='direccion'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor="region">Region: </label>
              <select
              name="region"
              className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
              // eslint-disable-next-line no-unused-expressions
              onChange={(e) => { formikSucursal.handleChange(e); handleRegion(e) }}>
              <option value="">Seleccione una categoria</option>
              {
                region && region.map((region) => (
                  <option key={region.region_id} value={region.region_id}>{region.region_nombre}</option>
                ))
              }
            </select>
            </div>

            <div className='grid grid-cols-3 items-center'>
              <label htmlFor='direccion' className='text-start'>Direccion: </label>
              <input
                type="text"
                onChange={formikProveedor.handleChange}
                value={formikProveedor.values.direccion}
                name='direccion'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

        </form>
      </div>

    </div>
    </MaxWidthWrapper>
  )
}

export default ProveedorForm
