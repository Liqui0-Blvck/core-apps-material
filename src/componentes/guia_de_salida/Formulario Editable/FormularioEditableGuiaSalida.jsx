import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FormHeader from './HeaderFormularioRegistro'
import { useFormik } from 'formik'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { urlNumeros } from '@/services/url_number'
import FooterFormularioEditableRegistro from './FooterFormularioEditableRegistro'


const FormularioEditableGuiaSalida = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: guia_salida } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/guia_salida/${id}`
  )
  console.log(guia_salida)

  const navigate = useNavigate()
  const initialRows = [
    {
      object_id: 0,
      cantidad: 0,
      content_type: 0
    },
  ]

  


  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  );

  console.log(rows)

  const formik = useFormik({
    initialValues: {
      destinatario: "",
      direccion: "",
      encargado: "",
      nombre_receptor: "",
      foto_firma: null
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('destinatario', values.destinatario)
      formData.append('direccion', values.direccion)
      formData.append('encargado', values.encargado)
      formData.append('nombre_receptor', values.nombre_receptor)
      if (values.foto_firma instanceof File){
        formData.append('foto_firma', values.foto_firma)
      }
  
      const objetoEnGuia = JSON.stringify(rows.map((row) => ({
        object_id: row.object_id,
        cantidad: row.cantidad,
        content_type: row.content_type,
      })));
  
      formData.append('objetos_en_guia', objetoEnGuia)
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/guia_salidas/`, {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          toast.success("Orden de compra creado correctamente!")
          navigate('/app/guia_salida/')
        } else {
          toast.error("No se ha podido crear la orden de compra, ¡vuelve a intentarlo!")
        }
      } catch (error) {
        console.log(error)
      }
    }
  })


  useEffect(() => {
    let isMounted = true

    if(guia_salida && isMounted){
      formik.setValues({
        destinatario: guia_salida.destinatario,
        direccion: guia_salida.direccion,
        encargado: guia_salida.encargado,
        nombre_receptor: guia_salida.nombre_receptor,
        foto_firma: guia_salida.foto_firma
      })

      setRows(guia_salida.objetos_en_guia)
    }
  }, [guia_salida])
  

  const handleAgregarItem = () => {
    // Agregar un nuevo ítem a la lista de ítems
    setRows((prevRows) => [
      ...prevRows,
      {
        object_id: 0,
        cantidad: 0,
        content_type: 0
      },
    ]);
  };



  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 my-10 overflow-hidden'>
        <FormHeader
          formik={formik}
        />
        <div id='form-list'>
          <FooterFormularioEditableRegistro
            rows={rows}
            setRows={setRows}
            formik={formik}
            handleAgregarItem={handleAgregarItem}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default FormularioEditableGuiaSalida
