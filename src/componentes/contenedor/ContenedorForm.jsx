
import { useFormik } from 'formik'
import { ESTADOS } from '../../const/constantes'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useContext, useState } from 'react'
import { compresor } from '../../services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import AuthContext from '../../context/AuthContext'

// eslint-disable-next-line react/prop-types
const ContenedorForm = () => {
  const [imagen, setImagen] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      nombre: '',
      color: '',
      dimensiones: '',
      tipo: '',
      estado: '',
      foto: null
    },
    onSubmit: async values => {
        const formData = new FormData();
        formData.append('nombre', values.nombre);
        formData.append('color', values.color);
        formData.append('dimensiones', values.dimensiones);
        formData.append('tipo', values.tipo);
        formData.append('estado', values.estado);
        formData.append('foto', values.imagen);

        const response = await fetch('http://localhost:8000/api/contenedor/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`
          },
          body: formData,
        });

        if (response.ok) {  
          toast.success('Contenedor añadido correctamente!');
          formik.setValues(formik.initialValues)
          setImagen(null)
          setNombreCategoria('')

          setTimeout(() => {
            navigate('/contenedores')
          }, 2000)

        } else {
          toast.error('Error al añadir el contenedor');
        }
    }
  })

  return (
    <MaxWidthWrapper>
      <h1 className='mb-10 '/>

      <div className='w-full h-full mx-auto justify-center gap-10 grid place-items-center overflow-hidden 
        lg:grid-cols-2'>
        <div className='border-[1px] border-gray-300 rounded-md flex flex-col w-full h-full overflow-hidden gap-2 justify-center
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
            <label className='text-start text-gray-700'>Color:</label>
            <div className='flex w-full text-balance overflow-auto'>
              <p className='text-start text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {formik.values.color}
              </p>
            </div>
          </div>
        
          <div className='flex gap-2 w-full p-2 mx-2'>
            <label className='text-start text-gray-800 w-40'>Dimensiones:</label>
            <div className='w-full text-balance overflow-hidden'>
              <p className='break-normal text-gray-700 col-span-3 overflow-hidden text-start'>{formik.values.dimensiones}</p>
            </div>
          </div>

          <div className='flex gap-2 w-full p-2 mx-2'>
            <label className='text-start text-gray-800 w-20'>Tipo:</label>
            <div className='w-full text-balance overflow-hidden'>
              <p className='break-normal text-gray-700 col-span-3 overflow-hidden text-start'>{formik.values.tipo}</p>
            </div>
          </div>

          <div className='flex gap-2 w-full p-2 mx-2'>
            <label className='text-start text-gray-800 w-20'>Estado:</label>
            <div className='w-full text-balance overflow-hidden'>
              <p className='break-normal text-gray-700 col-span-3 overflow-hidden text-start'>{formik.values.estado}</p>
            </div>
          </div>

        </div>

        <form className='grid grid-cols-4 gap-4 items-center w-[90%] h-full' onSubmit={formik.handleSubmit}>
          <label htmlFor='imagen' className='text-start'>Imagen:</label>
            <div 
              className='border-[2px] h-10 border-dashed border-blue-400 rounded-md p-2 mt-1 flex items-center justify-center cursor-pointer col-span-3'
              onClick={() => document.getElementById('input-field').click()}>
              <h1 className='font-semibold'>{filename}</h1>
              <input
                type='file'
                name='imagen'
                accept='image/*'
                onChange={async (e) => {
                  
                  if (e.currentTarget.files){
                    const compresor_result = await compresor(e.currentTarget.files[0], 0.5)
                    if (compresor_result){
                      const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                      setImagen(file)
                      formik.setFieldValue('imagen', file)
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
            className='border-[1px] border-gray-300 rounded-md p-1 mt-1 col-span-3'/>

          <label htmlFor='color' className='text-start'>Color:</label>
          <input 
            type="text" 
            name='color'
            onChange={formik.handleChange}
            value={formik.values.color}
            className='border-[1px] border-gray-300 rounded-md p-1 mt-1 col-span-3'/>
          
          
          <label htmlFor='dimensiones' className='text-start'>Dimensiones: </label>
          <input 
            type="text" 
            name='dimensiones'
            onChange={formik.handleChange}
            value={formik.values.dimensiones}
            className='border-[1px] border-gray-300 rounded-md p-1 mt-1 col-span-3'/>

          <label htmlFor="tipo" className='text-start'>Tipo</label>
          <input 
            type="text" 
            name='tipo'
            onChange={formik.handleChange}
            value={formik.values.tipo}
            className='border-[1px] border-gray-300 rounded-md p-1 mt-1 col-span-3  '/>

          <label htmlFor="estado" className='text-start'>Estado: </label>
          <select 
            name="estado" 
            className='border-[1px] border-gray-300 rounded-md p-1 mt-1 col-span-3'
            onChange={formik.handleChange}>
            <option value="">Seleccione una categoria</option>
            {
              ESTADOS.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))
            }
          </select>

          <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 col-start-2 col-span-3'>Agregar</button>

        </form>

      </div>

    </MaxWidthWrapper>
  )
}

export default ContenedorForm
