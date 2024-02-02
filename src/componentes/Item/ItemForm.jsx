/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { IoMdClose } from "react-icons/io";
import { compresor } from '../../services/compresor_imagen'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Skeleton } from '@mui/material'
import ItemFormulario from './Formulario/ItemFormulario'

const ItemForm = () => {
  const [categoria, setCategoria] = useState([])
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [data, setData] = useState([])
  const [imagen, setImagen] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  const { authTokens, validToken } = useContext(AuthContext)
  
  useEffect(() => {
    let isMounted = true
    

    if (authTokens){
      setLoading(true)
      const fetchData = async () => {
        try {
          const isValidToken = await validToken(authTokens)
  
          if (!isMounted) return 
  
          if (!isValidToken) {
            navigate('/auth/sign-in/');
          } else {
            const responseCategoria = await fetch(`http://localhost:8000/api/categoria/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authTokens.access}`
              }
            })

            if (responseCategoria.ok){
              const data = await responseCategoria.json()
              setCategoria(data)
            } else {
              console.log("Error en la peticion")
            }
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
      setLoading(false)
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
    }
  }, [authTokens])



  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      categoria: '',
      foto: null,
      unidad_medida: '',
      valor_unidad_medida: ''
    },
    onSubmit: async (values) => {
      console.log(values);
  
      // Crear un FormData para enviar el archivo correctamente
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('categoria', values.categoria);
      formData.append('foto', values.foto);
  
      try {
        const response = await fetch('http://localhost:8000/api/item/', {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${authTokens.access}`
          },
          body: formData, // Usa el FormData directamente para enviar el archivo
        });
  
        if (response.ok) {
          toast.success('Item añadido correctamente!');
          formik.setValues(formik.initialValues);
          setNombreCategoria('');
          navigate('/item/')
        } else {
          toast.error('Error al añadir el item');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });


  if (loading){
    return (
        <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    )
  }


  
  return (
    <MaxWidthWrapper>
      <ItemFormulario formik={formik}/>
    </MaxWidthWrapper>
  )
}

export default ItemForm
