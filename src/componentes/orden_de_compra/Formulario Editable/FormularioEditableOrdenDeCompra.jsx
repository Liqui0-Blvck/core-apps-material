import React, { useState, useEffect, useContext } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import toast from 'react-hot-toast'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useFormik } from 'formik'
import FooterFormularioEditableRegistro from './FooterFormularioEditableRegistro'
import HeaderFormularioRegistro from './HeaderFormularioRegistro'
import { urlNumeros } from '@/services/url_number'


const FormularioEditableOrdenDeCompra = () => {
  const { authTokens, validToken, user } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: orden_de_compra } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/${id}`
  ) 
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
      numero_cotizacion: "",
      proveedor: null,
      sucursal: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orden-compra/`, {
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
              fecha_llegada: row.fecha_llegada,
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
    // Agregar un nuevo ítem a la lista de ítems
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


  useEffect(() => {
    let isMounted = true

    if (orden_de_compra && isMounted){
      formik.setValues({
        nombre: orden_de_compra.nombre,
        numero_oc: orden_de_compra.numero_oc,
        fecha_orden: orden_de_compra.fecha_orden,
        numero_cotizacion: orden_de_compra.numero_cotizacion,
        proveedor: orden_de_compra.proveedor,
        sucursal: orden_de_compra.sucursal
      })

      setRows(orden_de_compra.items)
    }

    return () => {
      isMounted = false
    }
  }, [orden_de_compra])
  console.log(rows)

  console.log(orden_de_compra)
  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-20 py-10 lg:px-10 px-2 overflow-hidden'>
        <HeaderFormularioRegistro
          formik={formik}
        />
        <div id='form-list' className='mt-10'>
          <FooterFormularioEditableRegistro
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

export default FormularioEditableOrdenDeCompra
