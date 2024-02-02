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


const ProveedorForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [region, setRegion] = useState(null)
  const [provincia, setProvincia] = useState(null)
  const [comuna, setComuna] = useState(null)
  const [regionID, setRegionID] = useState(null)
  const [provinciaID, setProvinciaID] = useState(null)

 

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
            } else {
              console.log("Error en la petición")
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

  useEffect(() => {
    if (regionID){
      const getComunaData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/provincias/${provinciaID}/comunas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        if (response.ok){
          const data = await response.json()
          setComuna(data)
        }
      }
      getComunaData()

    } 
    return () => {}
  }, [provinciaID])

  useEffect(() => {
      const getProvinciaData = async () => {
        const responseProvincia = await fetch(`http://127.0.0.1:8000/api/region/${regionID}/provincias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        if (responseProvincia.ok){
          const data = await responseProvincia.json()
          setProvincia(data)
        }
      }
  
      getProvinciaData()

    return () => {}
  }, [regionID])


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
      foto: null
    },
    onSubmit: async values => {

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
        navigate('/proveedores/')
      } else {
        toast.error('Cualquier error es tu culpa')
      }

    }
  })

  console.log(formikProveedor.values)


  return (
    <MaxWidthWrapper>
      <h1 className='mt-10' />
      <div className='flex flex-col items-center h-full mt-14' >
        <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
         <h1 className='mb-10 text-center font-semibold text-2xl'>Proveedor</h1>
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
