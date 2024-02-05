import React, { useState, useEffect, useContext, useMemo } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import ItemOrdenForm from './ItemOrdenForm'
import toast from 'react-hot-toast'
import FormHeader from './FormHeader'
import { useFormik } from 'formik'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { urlNumeros } from '@/services/url_number'


const OrdenDeCompraFormEditar = () => {
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

  const [proveedor, setProveedor] = useState([])
  const [ordenCompraID, setOrdenCompraID] = useState(null)
  

  console.log(orden_compra)

  const formikOrden = useFormik({
    initialValues: {
      nombre: "",
      numero_oc: "",
      fecha_orden: null,
      estado_oc: null,
      email_envia_oc: "",
      numero_cotizacion: "",
      proveedor: null,
      unidad_de_compra: null,
      costo_por_unidad: null,
      fecha_llegada: null,
      observaciones: "",
      item: [],
      orden_de_compra: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orden-compra-editar/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...orden_compra,
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

  useEffect(() => {
    let isMounted = true

    if (orden_compra && isMounted){
      formikOrden.setValues({
        ...orden_compra,
        items: orden_compra.items
      })
    }

    return () => {
      isMounted = false
    }
  }, [orden_compra])


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
  //     const response = await fetch(`http://127.0.0.1:8000/api/orden-compra-editar/${ordenCompraData.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authTokens.access}`
  //       },
  //       body: JSON.stringify({
  //         ...ordenCompraData,
  //         items: rows.map((row) => ({
  //           id: row.id,
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
  //       setRows(initialRows);
  //       setIsActive(true);
  //       setProveedor(data.proveedor);
  //       setItemOrden({
  //         orden_de_compra: data.id,
  //       });
  //       setOrdenCompraID(data.id);
  //       navigate(`/orden-compra/`)
  //     } else {
  //       console.log("Error al crear la orden de compra");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-10 p-2'>
        <FormHeader 
          proveedores={proveedores} 
          proveedor={proveedor}
          setProveedor={setProveedor}
          ordenCompra={orden_compra}
          formik={formikOrden}
        />
        <div id='form-list' className='mt-10'>
          {/* <ItemOrdenForm
            ordenCompra={orden_compra}
            rows={rows}
            setRows={setRows}
            handleSubmit={handleSubmitOrdenCompra} 
            itemProveedor={items} 
            handleChange={handleInputChangeItem}
            handleAgregarItem={handleAgregarItem}
          /> */}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrdenDeCompraFormEditar
