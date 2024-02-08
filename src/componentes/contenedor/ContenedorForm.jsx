import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import ComponenteForm from './Formulario/ComponenteForm'

// eslint-disable-next-line react/prop-types
const ContenedorForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [imagen, setImagen] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      color: '',
      dimensiones: '',
      tipo: '',
      estado: '',
      foto: null,
      espacio: null
    },
    onSubmit: async values => {
        try {
          if (values.foto instanceof File){
            const formData = new FormData();
            formData.append('nombre', values.nombre);
            formData.append('color', values.color);
            formData.append('dimensiones', values.dimensiones);
            formData.append('tipo', values.tipo);
            formData.append('estado', values.estado);
            formData.append('foto', values.foto)
            formData.append('espacios', values.espacio)

            const response = await fetch('http://localhost:8000/api/contenedor/', {
              method: 'POST',
              headers: {
                'authorization': `Bearer ${authTokens.access}`
              },
              body: formData,
            });

            if (response.ok) {  
              toast.success('Contenedor añadido correctamente!');
              formik.setValues(formik.initialValues)
              setImagen(null)
              setNombreCategoria('')

              setTimeout(() => {
                navigate('/app/contenedores/')
              }, 2000)

            } else {
              toast.error('Error al añadir el contenedor');
            }
          } else {
            const formData = new FormData();
            formData.append('nombre', values.nombre);
            formData.append('color', values.color);
            formData.append('dimensiones', values.dimensiones);
            formData.append('tipo', values.tipo);
            formData.append('estado', values.estado)
            formData.append('espacio', values.espacio)

            const response = await fetch('http://localhost:8000/api/contenedor/', {
              method: 'POST',
              headers: {
                'authorization': `Bearer ${authTokens.access}`
              },
              body: formData,
            });

            if (response.ok) {  
              toast.success('Contenedor añadido correctamente!');
              formik.setValues(formik.initialValues)
              setImagen(null)
              setNombreCategoria('')

              setTimeout(() => {
                navigate('/contenedores/')
              }, 2000)

            } else {
              toast.error('Error al añadir el contenedor');
            }
          }
        } catch (error) {
          
        }
    }
  })

  console.log(formik.values)
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center h-full mt-20'>
        <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
          <h1 className='text-center font-semibold text-2xl'>Contenedor</h1>
          <ComponenteForm 
            formik={formik}
            filename={filename}
            imagen={imagen}
            setImagen={setImagen}
            setFilename={setFilename}
            />

        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ContenedorForm
