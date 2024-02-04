/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { useFormik } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Backdrop, Box, CircularProgress, Skeleton } from '@mui/material'
import ItemFormulario from './Formulario/ItemFormulario'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { ComponenteSchema } from '@/services/Validator'
import ModalForm from './Formulario/ModalForm'

const ItemForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: categoria, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/categoria/'
    )
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      categoria: '',
      foto: '',
    },
    validationSchema: ComponenteSchema,
    onSubmit: async (values) => {
  
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
          navigate('/item/')
        } else {
          toast.error('Error al añadir el item');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });
  
  // if (loading) {
  //   return (
  //     <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }
  
  return (
    <MaxWidthWrapper>
      <div className='relative'>
        <div className='flex justify-end'>
          <ModalForm className='bg-gray-500'/>
        </div>
        <ItemFormulario formik={formik} categoria={categoria}/>
      </div>
    </MaxWidthWrapper>
  )
}

export default ItemForm
