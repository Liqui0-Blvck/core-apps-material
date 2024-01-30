/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import MaxWidthWrapper from '../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material'
import { CategoriaSchema } from '../../services/Validator'
import AuthContext from '@/context/AuthContext'

const CategoriaForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [categoria, setCategoria] = useState([])
  const navigate = useNavigate()

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
            // Aqui se manejará las peticiones a las cosas que querramos obtener

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
    },
    validationSchema: CategoriaSchema,
    onSubmit: async values => {
      const response = await fetch('http://localhost:8000/api/categoria/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${authTokens.access}`
        },
        body: JSON.stringify({ ...values })
      })

      if (response.ok) {
        toast.success('Categoria agregada con exito!')
        navigate('/categorias')
      } else {
        toast.error('Error en')
      }
    }
  })


  


  return (
    <MaxWidthWrapper>
      <h1 className='mt-10'/>
      <div className='flex flex-col items-center h-full mt-14' >

      <div className='w-full h-[100%] mx-auto justify-center grid lg:grid-cols-2 place-items-center overflow-hidden'>
        <div className='border-[1px] border-gray-300 rounded-md flex flex-col w-[80%] h-96 overflow-hidden gap-4 overflow-y-scroll p-5'>
          <h1 className='text-center'>Categorias creadas</h1>
          <Divider />
          {
            categoria.map((cat) => (
              <div key={cat.id} className='h-14 w-full bg-gray-300 flex justify-center items-center rounded-md'>
                <span className='font-semibold tracking-wide'>{cat.nombre}</span>
              </div>
            ))
          }
        </div>

        <form className='grid grid-cols-3 items-center w-96 h-72' onSubmit={formik.handleSubmit}>
          <label htmlFor='nombre' className='text-center'>Nombre:</label>
          <input
            type="text"
            name='nombre'
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
          {
            formik.errors.nombre && formik.touched.nombre && (
              <p className='text-red-600 col-start-2 col-span-2'>{formik.errors.nombre}</p>
            )
          }
            

          <label htmlFor='Descripcion' className='text-center'>Descripcion: </label>
          <textarea
            type="text"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            name='descripcion'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            {
              formik.errors.descripcion && formik.touched.descripcion && (
                <p className='text-red-600 col-start-2 col-span-2'>{formik.errors.descripcion}</p>
              )
            }
          <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 col-start-2 col-span-2'>Agregar</button>

        </form>
      </div>

    </div>
    </MaxWidthWrapper>
  )
}

export default CategoriaForm
