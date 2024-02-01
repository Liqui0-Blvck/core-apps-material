import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from '../../MaxWidthWrapper'
import ItemOrdenForm from './ItemOrdenForm'
import toast from 'react-hot-toast'
import FormHeader from './FormHeader'
import { useFormik } from 'formik'


const OrdenDeCompraFormEditar = ({ path }) => {
  const { authTokens, validToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)

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

  const [proveedores, setProveedores] = useState([])
  const [proveedor, setProveedor] = useState([])

  const [items, setItems] = useState([])
  const [ordenCompraID, setOrdenCompraID] = useState(null)


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

 


  useEffect(() => {
    let isMounted = true

    if (authTokens){
      console.log("si hay token")
      const fetchData = async () => {
        try {
          const isValidToken = await validToken(authTokens)
  
          if (!isMounted) return 
  
          if (!isValidToken) {
            navigate('/auth/sign-in/');
          } else {

            // peticion a proveedor
            const responseProveedor = await fetch(`http://127.0.0.1:8000/api/proveedor/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authTokens.access}`
              }
            })

            if (responseProveedor.status === 200){
              const data = await responseProveedor.json()
              setProveedores(data)
            } else {
              console.log("Error en la peticion")
            }

            const responseItem = await fetch('http://127.0.0.1:8000/api/item/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization':  `Bearer ${authTokens.access}`
              }
            })

            if (responseItem.ok){
              const data = await responseItem.json()
              setItems(data)
            } else {
              console.log("Error en la petición")
            }

            const responseOrden = await fetch(`http://127.0.0.1:8000/api${path}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization':  `Bearer ${authTokens.access}`
              }
            })

            if (responseOrden.ok){
              const data = await responseOrden.json()
              setOrdenCompraData(data)
              setRows(data.items)
            } else {
              console.log("Error en la petición")
            }

            

          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
    } else {
      console.log("no pasa nada aqui no hay token")
    }

    return () => {
      isMounted = false
    }
  }, [authTokens])


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
      const response = await fetch(`http://127.0.0.1:8000/api/orden-compra-editar/${ordenCompraData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
        },
        body: JSON.stringify({
          ...ordenCompraData,
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
        setRows(initialRows);

        setIsActive(true);
        setProveedor(data.proveedor);
        setItemOrden({
          orden_de_compra: data.id,
        });
        setOrdenCompraID(data.id);
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

 console.log(rows)


  return (
    <MaxWidthWrapper>
      <div className='border-[1px] border-gray-500 rounded-md bg-gray-100 md:my-20 my-10 p-2'>
        <FormHeader 
          handleSubmit={handleSubmitOrdenCompra} 
          handleChange={handleInputChange} 
          proveedores={proveedores} 
          proveedor={proveedor}
          setProveedor={setProveedor}
          ordenCompra={ordenCompraData}
        />
        <div id='form-list' className='mt-10'>
          <ItemOrdenForm
            ordenCompra={ordenCompraData}
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

export default OrdenDeCompraFormEditar
