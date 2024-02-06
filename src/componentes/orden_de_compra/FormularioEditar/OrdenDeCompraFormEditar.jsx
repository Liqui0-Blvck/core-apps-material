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

  const { data: orden_compra, loading: loadingOrden } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/orden-compra/${id}`
  )

  const { data: items, loading: loadingItem } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/item/`
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


  useEffect(() => {
    let isMounted = true

    if (orden_compra && isMounted){
      setRows(orden_compra.items)
    }
  }, [orden_compra])


  const [ordenCompraData, setOrdenCompraData] = useState({
    "nombre": "",
    "numero_oc": "",
    "fecha_orden": null,
    "estado_oc": null,
    "email_envia_oc": "",
    "numero_cotizacion": "",
    "proveedor": null
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

  const handleSubmitOrdenCompra = async (e) => {
    e.preventDefault();

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

      const data = await response.json();
      if (response.ok) {
        setRows(initialRows)
        setItemOrden({
          orden_de_compra: data.id,
        })
        setTimeout(() => {
          navigate(`/app/orden-compra/`)
        }, 1500)
      } else {
        console.log("Error al crear la orden de compra");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    console.log(`estoy en ${name} y mi valor es ${value}`,)

    setOrdenCompraData({
      ...ordenCompraData,
      [name]: value,
    });
  };

  const handleInputChangeItem = ({ target }) => {
    const {name, value} = target;

    console.log(`Estoy en nombre ${name} y mi valor es ${value}`)

    setItemOrden({
      ...itemOrden,
      [name]: value
    });

  };

  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-10 p-2'>
        <FormHeader 
          handleSubmit={handleSubmitOrdenCompra} 
          handleChange={handleInputChange} 
          ordenCompra={orden_compra}
          loading={loadingOrden}
        />
        <div id='form-list' className='mt-10'>
          <ItemOrdenForm
            ordenCompra={orden_compra}
            items={items}
            rows={rows}
            setRows={setRows}
            loading={loadingItem}
            handleSubmit={handleSubmitOrdenCompra} 
            handleChange={handleInputChangeItem}
            handleAgregarItem={handleAgregarItem}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrdenDeCompraFormEditar
