import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { compresor } from '@/services/compresor_imagen'
import { IoMdClose } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import FooterFormularioEditableInvento from './FooterFormularioEditableInvento'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useAuth } from '@/context/AuthContext'

const { TextArea } = Input

const FormularioEditableInvento = () => {
  const { authTokens, validToken } = useAuth()
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isValid, setIsValid] = useState(false)
  const id = urlNumeros(pathname)
  const { data: invento } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/invento/${id}`
  )

  console.log(id)
  console.log(invento)
  console.log(imagen)


  const initialRows = [
    {
      id: 0,
      item: 0,
      cantidad: 0,
    },
  ]

  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  )



  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      foto: ''
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      if (values.foto instanceof File) {
        formData.append('foto', values.foto);
      }

      const itemsJson = JSON.stringify(rows.map((row) => ({
        id: row.id,
        item: row.item,
        cantidad: row.cantidad
      })));
      formData.append('items', itemsJson);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/invento/${id}/`, {
          method: 'PUT',
          body: formData
        });

        if (response.ok) {
          toast.success("¡Invento creado correctamente!");
          navigate('/app/inventos/')
        } else {
          toast.error("No se pudo crear el invento. ¡Por favor, inténtalo de nuevo!");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    }
  });

  useEffect(() => {
    let isMounted = true

    if (invento && isMounted) {
      formik.setValues({
        nombre: invento.nombre,
        descripcion: invento.descripcion,
        foto: invento.foto
      })

      setRows(invento.items)
      setImagen(invento.foto)
    }

    return () => {
      isMounted = false
    }
  }, [invento])



  const handleAgregarItem = () => {
    // Agregar un nuevo ítem a la lista de ítems
    setRows((prevRows) => [
      ...prevRows,
      {
        id: null,
        item: null,
        cantidad: null
      },
    ]);
  };


  return (
    <MaxWidthWrapper>
      <div className='flex items-center my-10 w-full'>
        <form onSubmit={formik.handleSubmit} className='w-full h-full p-5 relative' encType='multipart/form-data'>

          <div className='grid grid-cols-7 h-52 gap-5'>

            <div
              className='
              w-full 
              lg:row-span-2 lg:col-span-2
              md:row-span-2 md:col-span-2
              border-[2px] h-44 border-dashed
            border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
              onClick={() => document.getElementById('input-field').click()}>
              <h1 className='font-semibold text-center'>{filename}</h1>
              <input
                type='file'
                name='foto'
                accept='image/*'
                onChange={async (e) => {

                  if (e.currentTarget.files) {
                    const compresor_result = await compresor(e.currentTarget.files[0], 0.6)
                    if (compresor_result) {
                      const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp' })
                      setImagen(file)
                      formik.setFieldValue('foto', file)
                      setFilename('Foto seleccionada')
                    }
                  }
                }}
                className='hidden'
                id='input-field' />

              {
                imagen && (
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
                    <img src={imagen} alt="" className='z-10 absolute w-full h-full object-contain rounded-md first-letter:' />
                  </>
                )
              }
            </div>
            <div className='flex flex-col col-start-3 col-span-2 gap-2'>
              <label htmlFor="nombre">Nombre:</label>
              <Input
                className='p-2.5'
                type='text'
                name='nombre'
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
            </div>

            <div className='flex flex-col col-start-5 col-span-3 row-span-2 gap-2'>
              <label htmlFor="descripcion col-span-1">Descripción: </label>
              <TextArea
                rows={6}
                name='descripcion'
                className='w-full h-full'
                value={formik.values.descripcion}
                onChange={(e) => formik.handleChange(e)}
              />
            </div>
          </div>


          <FooterFormularioEditableInvento
            rows={rows}
            setRows={setRows}
            formik={formik}
            isValid={setIsValid}
            handleAgregarItem={handleAgregarItem}
          />

          <button type='submit' disabled={!isValid} className='absolute -bottom-20 right-10 rounded-md p-2 bg-blue-600'>
            <p className='text-white'>
              Agregar items
            </p>
          </button>
        </form>
      </div>
    </MaxWidthWrapper>

  )
}

export default FormularioEditableInvento