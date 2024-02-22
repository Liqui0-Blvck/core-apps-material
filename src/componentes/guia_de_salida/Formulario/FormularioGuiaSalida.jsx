import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import toast from 'react-hot-toast'
import FormHeader from './HeaderFormularioRegistro'
import { useFormik } from 'formik'
import FooterFormularioRegistro from './FooterFormularioRegistro'


const FormularioGuiaSalida = () => {
  const { authTokens, validToken, user } = useContext(AuthContext)

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
      firma_encargado: null
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('destinatario', values.destinatario)
      formData.append('direccion', values.direccion)
      formData.append('encargado', values.encargado)
      formData.append('nombre_receptor', values.nombre_receptor)
      formData.append('firma_encargado', values.firma_encargado)

  
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
          navigate('/app/guia-salida/')
        } else {
          toast.error("No se ha podido crear la orden de compra, ¡vuelve a intentarlo!")
          setTimeout(() => {
            toast.error("Debes incluir la firma")
          }, 2000)

        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  

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
          <FooterFormularioRegistro
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

export default FormularioGuiaSalida
