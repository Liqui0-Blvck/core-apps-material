import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import ItemOrdenForm from './ItemOrdenForm'
import toast from 'react-hot-toast'
import FormHeader from './FormHeader'
import { urlNumeros } from '@/services/url_number'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { useFormik } from 'formik'


const OrdenDeCompraForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)


  const { data: proveedores} = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/proveedor/'
  )

  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/item/'
  )

  const { data: orden_compra } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/${id}`
  )


  const initialRows = [
    {
      item: "",
      unidad_de_compra: 0,
      costo_por_unidad: 0,
      fecha_llegada: "",
      observaciones: "",
    },
  ];
  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  );

  const formikOrden = useFormik({
    initialValues: {
      nombre: "",
      numero_oc: '10',
      fecha_orden: null,
      estado_oc: null,
      email_envia_oc: "",
      numero_cotizacion: "",
      proveedor: null,
      unidad_de_compra: null,
      costo_por_unidad: null,
      fecha_llegada: null,
      observaciones: "",
      items: [],
      orden_de_compra: null
    },
    onSubmit: async (values) => {

      console.log(values)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orden-compra/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...values,
            items: rows.map((row) => ({
              id: row.id, 
              item: row.item,
              unidad_de_compra: row.unidad_de_compra,
              costo_por_unidad: row.costo_por_unidad,
              fecha_llegada: row.fecha_llegada,
              observaciones: row.observaciones,
              
            })),
          }),
        });
      } catch (error) {
        console.log("error revisa denuevo que hiciste mal")
      }
    }
  })

  
  const [proveedor, setProveedor] = useState([])
  const [ordenCompra, setOrdenCompra] = useState(null)

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

  // const handleSubmitOrdenCompra = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/api/orden-compra/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authTokens.access}`
  //       },
  //       body: JSON.stringify({
  //         ...ordenCompraData,
  //         items: rows.map((row) => ({
  //           item: row.item,
  //           unidad_de_compra: row.unidad_de_compra,
  //           costo_por_unidad: row.costo_por_unidad,
  //           fecha_llegada: row.fecha_llegada,
  //           observaciones: row.observaciones,
  //         })),
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setOrdenCompraData({
  //         "nombre": "",
  //         "numero_oc": "",
  //         "fecha_orden": null,
  //         "estado_oc": null,
  //         "email_envia_oc": "",
  //         "numero_cotizacion": "",
  //         "proveedor": null,
  //       });
  //       setRows(initialRows);

  //       setIsActive(true);
  //       setProveedor(data.proveedor);
  //       setItemOrden({
  //         orden_de_compra: data.id,
  //       });
  //       setOrdenCompra(data.id);
  //       navigate('/app/orden-compra/')
  //     } else {
  //       console.log("Error al crear la orden de compra");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleInputChange = ({ target }) => {
  //   const { name, value } = target;

  //   setOrdenCompraData({
  //     ...ordenCompraData,
  //     [name]: value,
  //   });
  // };

  // const handleInputChangeItem = ({ target }) => {
  //   const {name, value} = target;

  //   setItemOrden({
  //     ...itemOrden,
  //     [name]: value
  //   });
  // };

  console.log(formikOrden.values)

  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-10 p-2'>
        <FormHeader 
          formik={formikOrden}
          proveedores={proveedores}
          proveedor={proveedor}
          setProveedor={setProveedor}
        />
        <div id='form-list' className='mt-10'>
          <ItemOrdenForm 
          rows={rows}
          setRows={setRows}
          formik={formikOrden}
          itemProveedor={items} 
          handleAgregarItem={handleAgregarItem}
        />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrdenDeCompraForm
