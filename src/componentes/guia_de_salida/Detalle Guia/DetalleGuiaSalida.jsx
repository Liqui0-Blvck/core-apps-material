import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { urlNumeros } from '@/services/url_number'
import HeaderDetalleGuiaSalida from './HeaderDetalleGuiaSalida'
import FooterDetalleGuiaSalida from './FooterDetalleGuiaSalida'


const DetalleGuiaSalida = () => {
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

  const formik = useFormik({
    initialValues: {
      destinatario: "",
      direccion: "",
      encargado: "",
      nombre_receptor: "",
      firma_encargado: null,
      firma_recepcion: null
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('destinatario', values.destinatario)
      formData.append('direccion', values.direccion)
      formData.append('encargado', values.encargado)
      formData.append('nombre_receptor', values.nombre_receptor)
      if (values.firma_recepcion instanceof File){
        formData.append('firma_recepcion', values.firma_recepcion)
      }
  
      const objetoEnGuia = JSON.stringify(rows.map((row) => ({
        object_id: row.object_id,
        cantidad: row.cantidad,
        content_type: row.content_type,
      })));
  
      formData.append('objetos_en_guia', objetoEnGuia)
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/guia_salida/${id}/`, {
          method: 'PUT',
          body: formData
        });

        await fetch(`http://127.0.0.1:8000/api/guia_salida_update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado_guia: 5 })
      })
  
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
        firma_encargado: guia_salida.firma_encargado,
        firma_recepcion: guia_salida.firma_recepcion
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

  console.log(rows)

  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 my-10 overflow-hidden'>
        <HeaderDetalleGuiaSalida
          formik={formik}
        />
        <div id='form-list'>
          <FooterDetalleGuiaSalida
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

export default DetalleGuiaSalida
