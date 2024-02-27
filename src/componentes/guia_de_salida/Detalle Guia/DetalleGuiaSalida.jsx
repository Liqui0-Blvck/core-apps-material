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
    `/api/guia_salida/${id}`
  )

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

      setRows(guia_salida.elementos)
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
