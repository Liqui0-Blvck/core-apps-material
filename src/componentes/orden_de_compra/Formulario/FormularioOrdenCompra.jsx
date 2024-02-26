import React, { useState, useEffect, useContext } from 'react'
import AuthContext, { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import toast from 'react-hot-toast'
import FormHeader from './HeaderFormularioRegistro'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useFormik } from 'formik'
import FooterFormularioRegistro from './FooterFormularioRegistro'


const FormularioOrdenDeCompra = () => {
  const { authTokens, validToken, user } = useAuth()
  const base_url = import.meta.env.VITE_BASE_URL

  const navigate = useNavigate()


  const initialRows = [
    {
      item: 0,
      unidad_de_compra: 0,
      costo_por_unidad: 0,
      fecha_llegada: "",
      observaciones: "",
    },
  ]


  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  );


  const formik = useFormik({
    initialValues: {
      nombre: "",
      numero_oc: "",
      fecha_orden: null,
      estado_oc: null,
      email_envia_oc: "",
      numero_cotizacion: "",
      proveedor: null,
      sucursal: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${base_url}/api/orden-compra/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...values,
            solicitado_por: user.user_id,
            items: rows.map((row) => ({
              item: row.item,
              unidad_de_compra: row.unidad_de_compra,
              costo_por_unidad: row.costo_por_unidad,
              fecha_llegada: formik.values.fecha_orden,
              observaciones: row.observaciones,
            })),
          }),
        });

        if (response.ok) {
          toast.success("Orden de compra creado correctamente!")
          navigate('/app/orden-compra/')
        } else {
          toast.error("No se ha podido crear la orden de compra, ¡vuelve a intentarlo!")
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const [itemOrden, setItemOrden] = useState({
    "unidad_de_compra": null,
    "costo_por_unidad": null,
    "fecha_llegada": null,
    "observaciones": "",
    "item": [],
    "orden_de_compra": null
  })

  const handleAgregarItem = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        item: "",
        unidad_de_compra: 0,
        costo_por_unidad: 0,
        fecha_llegada: "",
        observaciones: "",
      },
    ]);
  };


  const handleInputChangeItem = ({ target }) => {
    const { name, value } = target;

    setItemOrden({
      ...itemOrden,
      [name]: value
    });
  };

  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-20 py-10 lg:px-10 px-2 overflow-hidden'>
        <FormHeader
          formik={formik}
        />
        <div id='form-list' className='mt-10'>
          <FooterFormularioRegistro
            rows={rows}
            setRows={setRows}
            formik={formik}
            handleChange={handleInputChangeItem}
            handleAgregarItem={handleAgregarItem}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default FormularioOrdenDeCompra
