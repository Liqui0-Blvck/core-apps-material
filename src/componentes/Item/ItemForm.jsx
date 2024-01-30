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

const ItemForm = () => {
  const [categoria, setCategoria] = useState([])
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [data, setData] = useState([])
  const [imagen, setImagen] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const navigate = useNavigate()


  const { authTokens, validToken } = useContext(AuthContext)
  
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
      categoria: '',
      foto: null // Cambiado a null en lugar de una cadena vacía
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
        } else {
          toast.error('Error al añadir el item');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });


  
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center h-full mt-10 mb-24' >

      <div className='w-full h-full mx-auto justify-center gap-10 grid place-items-center overflow-hidden 
        lg:grid-cols-2'>
        <div className='border-[1px] border-gray-300 rounded-md flex flex-col w-full h-96 overflow-hidden gap-2 justify-center
          lg:w-80'>
          <div className='border-[1px] border-gray-200 mx-auto w-72 h-48 mt-2 relative rounded-md
            lg:w-72'>
            {
              imagen
                ? (
                  <>
                    <div className='absolute h-7 w-7 bg-red-800 rounded-full flex justify-center items-center -right-2 -top-2 cursor-pointer'>
                      <IoMdClose 
                        className='absolute text-2xl text-white'
                        onClick={() => {
                          setImagen(null)
                          setFilename('No hay ninguna foto seleccionada')
                        }}
                      />
                    </div>
                    <img src={URL.createObjectURL(imagen)} alt="" className='w-full h-full object-contain rounded-md'/>
                  </>
                  )
                : (
                    <img src='src\assets\default.webp' alt='' className='w-full h-full object-cover rounded-md'/>
                  )
            }
          </div>
        
          <div className='flex gap-5 w-full p-2 mt-5 mx-2'>
            <label className='text-start text-gray-700'>Nombre:</label>
            <div className='flex flex-col w-full text-balance overflow-hidden'>
              <p className='text-start text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis'>{formik.values.nombre}</p>
            </div>
          </div>
        
          <div className='flex gap-2 w-full p-2 mx-2'>
            <label className='text-start text-gray-700'>Descripcion:</label>
            <div className='flex w-full text-balance overflow-auto'>
              <p className='text-start text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {formik.values.descripcion}
              </p>
            </div>
          </div>
        
          <div className='flex gap-2 w-full p-2 mx-2'>
            <label className='text-start text-gray-800 w-20'>Categoria:</label>
            <div className='w-full text-balance overflow-hidden'>
              <p className='break-normal text-gray-700 col-span-3 overflow-hidden text-start'>{nombreCategoria}</p>
            </div>
          </div>
        </div>
    

        <form className='grid grid-cols-3 items-center w-full h-72' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <label htmlFor='imagen' className='text-start'>Imagen:</label>
          <div 
            className='border-[2px] h-10 border-dashed border-blue-400 rounded-md p-2 mt-1 col-span-2 flex items-center justify-center cursor-pointer'
            onClick={() => document.getElementById('input-field').click()}>
            <h1 className='font-semibold'>{filename}</h1>
          <input
            type='file'
            name='foto'
            accept='image/*'
            onChange={async (e) => {
              
              if (e.currentTarget.files){
                const compresor_result = await compresor(e.currentTarget.files[0], 0.5)
                if (compresor_result){
                  const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                  setImagen(file)
                  formik.setFieldValue('foto', file)
                  setFilename('Foto seleccionada')
                }
              }
          }}
            className='hidden'
            id='input-field'/>
          </div>

          <label htmlFor='nombre' className='text-start'>Nombre:</label>
          <input
            type="text"
            name='nombre'
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>

          <label htmlFor='Descripcion' className='text-start'>Descripcion: </label>
          <textarea
            type="text"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            name='descripcion'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2 text-start'/>

          <label htmlFor="categoria" className='text-start'>Categoria</label>
          <select
            name="categoria"
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
            // eslint-disable-next-line no-unused-expressions
            onChange={(e) => { formik.handleChange(e); setNombreCategoria(e.target.selectedOptions[0].textContent) }}>
            <option value="">Seleccione una categoria</option>
            {
              categoria.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))
            }
          </select>

          <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 col-start-2 col-span-2'>Agregar</button>

        </form>
      </div>

    </div>
    </MaxWidthWrapper>
  )
}

export default ItemForm
