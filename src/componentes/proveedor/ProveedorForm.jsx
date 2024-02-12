/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useFormik, ErrorMessage } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material'
import AuthContext from '@/context/AuthContext'
import ProveedorFormulario from './Formularios/ProveedorFormulario'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { Proveedorschema } from '@/services/Validator'


const ProveedorForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [regionID, setRegionID] = useState(null)
  const [provinciaID, setProvinciaID] = useState(null)
  const navigate = useNavigate()


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

  

  const formikProveedor = useFormik({
    initialValues: {
      nombre: '',
      rut: '',
      correo: '',
      contacto: '',
      direccion: '',
      comuna: null,
      region: null,
      provincia: null,
      foto: ''
    },
    validationSchema: Proveedorschema,
    onSubmit: async values => {
      try {
        if (values.foto instanceof File){
          const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('rut', values.rut);  
          formData.append('correo', values.correo);  
          formData.append('foto', values.foto);
          formData.append('contacto', values.contacto);
          formData.append('direccion', values.direccion);
          formData.append('comuna', values.comuna);
          formData.append('region', values.region);
          formData.append('provincia', values.provincia);

          const response = await fetch('http://localhost:8000/api/proveedor/', {
            method: 'POST',
            headers: {
              
              'authorization': `Bearer ${authTokens.access}`
            },
            body: formData
          })

          if (response.ok) {
            toast.success('Proveedor agregado correctamente')
            navigate('/app/proveedores/')
          } else {
            toast.error('Cualquier error es tu culpa')
          }
        } else {
          const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('rut', values.rut);  
          formData.append('correo', values.correo);
          formData.append('contacto', values.contacto);
          formData.append('direccion', values.direccion);
          formData.append('comuna', values.comuna);
          formData.append('region', values.region);
          formData.append('provincia', values.provincia);

          const response = await fetch('http://localhost:8000/api/proveedor/', {
            method: 'POST',
            headers: {
              
              'authorization': `Bearer ${authTokens.access}`
            },
            body: formData
          })

          if (response.ok) {
            toast.success('Proveedor agregado correctamente')
            navigate('/app/proveedores/')
          } else {
            toast.error('Cualquier error es tu culpa')
          }
        }

      } catch (error) {
        console.log(error)
      }
    }
  })


  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center h-full' >
        <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
          <ProveedorFormulario 
            formik={formikProveedor} 
            region={region} 
            provincia={provincia} 
            comuna={comuna}
            setRegionID={setRegionID}
            setProvinciaID={setProvinciaID}/>

        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProveedorForm
