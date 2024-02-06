import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import ItemOrdenForm from './ItemOrdenForm'
import toast from 'react-hot-toast'
import FormHeader from './FormHeader'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'


const OrdenDeCompraForm = () => {
  const { authTokens, validToken } = useContext(AuthContext)
  const [proveedor, setProveedor] = useState([])
  const navigate = useNavigate()
  const { data: proveedores } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/proveedor/` 
  )

  const { data: items } = useAuthenticatedFetch(
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
  ]
  
  const [rows, setRows] = useState(
    initialRows.map((row, index) => ({ ...row, id: index }))
  );

  const [ordenCompraData, setOrdenCompraData] = useState({
    nombre: "",
    numero_oc: "",
    fecha_orden: null,
    estado_oc: null,
    email_envia_oc: "",
    numero_cotizacion: "",
    proveedor: null,
    sucursal: ''
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
      const response = await fetch(`http://127.0.0.1:8000/api/orden-compra/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
        },
        body: JSON.stringify({
          ...ordenCompraData,
          items: rows.map((row) => ({
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
        setOrdenCompraData({
          "nombre": "",
          "numero_oc": "",
          "fecha_orden": null,
          "estado_oc": null,
          "email_envia_oc": "",
          "numero_cotizacion": "",
          "proveedor": null,
        });
        setRows(initialRows);
        setProveedor(data.proveedor);
        setItemOrden({
          orden_de_compra: data.id,
        });
        navigate('/app/orden-compra/')
      } else {
        console.log("Error al crear la orden de compra");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setOrdenCompraData({
      ...ordenCompraData,
      [name]: value,
    });
  };

  const handleInputChangeItem = ({ target }) => {
    const {name, value} = target;

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
          proveedores={proveedores}
          proveedor={proveedor}
          setProveedor={setProveedor}
        />
        <div id='form-list' className='mt-10'>
          <ItemOrdenForm 
          rows={rows}
          setRows={setRows}
          handleSubmit={handleSubmitOrdenCompra} 
          itemProveedor={items} 
          handleChange={handleInputChangeItem}
          handleAgregarItem={handleAgregarItem}
        />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrdenDeCompraForm
