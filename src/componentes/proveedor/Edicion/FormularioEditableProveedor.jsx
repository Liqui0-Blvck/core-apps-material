/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { useFormik, } from 'formik'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { Input, Select } from 'antd'
import { urlNumeros } from '@/services/url_number'



const FormularioEditableProveedor = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [locacion, setLocacion] = useState({
    region: '',
    provincia: '',
    comuna: ''
  })
  const [regionID, setRegionID] = useState(null)
  const [provinciaID, setProvinciaID] = useState(null)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)

  const { data: proveedor} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/${id}`
  )

  const handleRegion = ({ target }) => {
    const { value } = target
    setRegionID(value)
  }


  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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

  const navigate = useNavigate()

  const formik = useFormik({
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

          const response = await fetch(`http://localhost:8000/api/proveedor/${id}/` , {
            method: 'PUT',
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

          const response = await fetch(`http://localhost:8000/api/proveedor/${id}/`, {
            method: 'PUT',
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


  useEffect(() => {
    let isMounted = true

    if(proveedor && isMounted){
      formik.setValues({
        nombre: proveedor.nombre,
        rut: proveedor.rut,
        correo: proveedor.correo,
        contacto: proveedor.contacto,
        direccion: proveedor.direccion,
        comuna: proveedor.comuna,
        region: proveedor.region,
        provincia: proveedor.provincia,
        foto: proveedor.foto
      })
      setLocacion({
        region: proveedor.region_nombre,
        provincia: proveedor.provincia_nombre,
        comuna: proveedor.comuna_nombre
      })
    }
  }, [proveedor])

  console.log(locacion)
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center h-full' >
        <div className='w-full h-full mx-auto justify-center place-items-center overflow-hidden'>
          <h1 className='mb-10 text-center font-semibold text-2xl'>Proveedor</h1>
          
          <form className='grid grid-cols-6 items-center gap-10 w-full h-full' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            <div 
              className='row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
              onClick={() => document.getElementById('input-field').click()}>
              <h1 className='font-semibold text-center'>{filename}</h1>
              <Input
                type='file'
                name='foto'
                accept='image/*'
                onChange={async (e) => {
                  
                  if (e.currentTarget.files){
                    const compresor_result = await compresor(e.currentTarget.files[0], 0.9)
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

              {
                imagen &&  (
                  <>
                  <div className='absolute h-7 w-7 bg-red-800 rounded-full flex justify-center items-center -right-2 -top-2 cursor-pointer z-20'>
                          <IoMdClose 
                            className='absolute text-2xl text-white z-100'
                            onClick={() => {
                              setImagen(null)
                              setFilename('No hay ninguna foto seleccionada')
                            }}
                          />
                        </div>
                  <img src={URL.createObjectURL(imagen)} alt="" className='z-10 absolute w-full h-full object-contain rounded-md first-letter:'/>
                  </>
                  )
              }
            </div>

            <div className='grid grid-cols-2 items-center col-start-3 col-span-2'>
              <label htmlFor='nombre' className='text-start'>Nombre:</label>
              <Input
                type="text"
                name='nombre'
                onChange={formik.handleChange}
                value={formik.values.nombre}
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
            
            <div className='grid grid-cols-2 items-center col-start-5 col-span-2'>
              <label htmlFor='rut' className='text-center w-10'>Rut: </label>
              <Input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.rut}
                name='rut'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
            

            <div className='grid row-start-2 col-start-3 col-span-2  items-center'>
              <label htmlFor='direccion' className='text-start'>Direccion: </label>
              <Input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.direccion}
                name='direccion'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid row-start-2 grid-cols-2 col-span-2 col-start-5 items-center'>
              <label htmlFor='contacto' className='text-start'>Contacto: </label>
              <Input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contacto}
                name='contacto'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>
            


            <div className='grid grid-cols-2 row-start-3 items-center  col-span-2 '>
              <label htmlFor='correo' className='text-start'>Correo: </label>
              <Input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.correo}
                name='correo'
                className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
            </div>

            <div className='grid grid-cols-2 row-start-3 col-span-2 col-start-3 items-center'>
              <label htmlFor="region">Region: </label>
              <Select
                showSearch
                placeholder="Selecciona una región"
                optionFilterProp="children"
                className='rounded-md mt-1 col-span-3 h-11 w-full'
                onChange={value => {setRegionID(value), formik.setFieldValue('region', value), setLocacion('region', value)} }
                onSearch={onSearch}
                name='region'
                value={locacion.region}
                filterOption={filterOption}
                options={region && region.map(item => ({
                  value: item.region_id,
                  label: item.region_nombre
                }))}
              />
            </div>

            <div className='grid grid-cols-2 row-start-3 col-span-2 col-start-5 items-center'>
              <label htmlFor="provincia">Provincia: </label>
              <Select
                showSearch
                placeholder="Selecciona una provincia"
                optionFilterProp="children"
                className='rounded-md mt-1 col-span-3 h-11 w-full'
                onChange={value => {setProvinciaID(value), formik.setFieldValue('provincia', value), setLocacion('provincia', value)}}
                onSearch={onSearch}
                name='provincia'
                defaultActiveFirstOption={false}
                filterOption={filterOption}
                value={locacion.provincia}
                options={provincia && provincia.map(item => ({
                  value: item.provincia_id,
                  label: item.provincia_nombre
                }))}
              />
            </div>

            <div className='grid grid-cols-2 col-span-2 items-center'>
              <label htmlFor="comuna">Comuna: </label>
              <Select
                showSearch
                placeholder="Selecciona una provincia"
                optionFilterProp="children"
                className='rounded-md mt-1 col-span-3 h-11 w-full'
                onChange={value => {formik.setFieldValue('comuna', value), setLocacion('comuna', value)}}
                name='comuna'
                onSearch={onSearch}
                value={locacion.comuna}
                filterOption={filterOption}
                options={comuna && comuna.map(item => ({
                  value: item.comuna_id,
                  label: item.comuna_nombre
                }))}
              />
              
            </div>

            <div className='w-full relative col-start-3 col-span-2 '>
              <button type='submit' className='absolute -top-1 col-start-3 col-span-3 p-2 bg-blue-400 text-white rounded-md w-full'>Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default FormularioEditableProveedor
