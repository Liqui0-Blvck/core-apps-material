/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FaCirclePlus } from "react-icons/fa6";
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { useAuth } from '@/context/AuthContext';
import { Select } from 'antd';
import { ContentTypes } from '@/const/constantes';

const FooterFormularioEditableRegistro = ({ formik, handleChange, rows, setRows, handleAgregarItem }) => {
  const { authTokens, validToken } = useAuth()
  const [tipoSeleccionado, setTipoSeleccionado] = useState(0)
  const tipo_objeto = ContentTypes.find(obj => obj.value === tipoSeleccionado)?.path
  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/items/'
  )

  const { data: inventos } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/api/inventos/'
  )

  const itemNombre = items &&
    items.filter(item => rows.some(rowItem => Number(rowItem.object_id) === item.id))
      .map(item => ({
        value: item.id,
        label: item.nombre
      }))

  const inventoNombre = inventos &&
    inventos.filter(item => rows.some(rowItem => Number(rowItem.object_id) === item.id))
      .map(item => ({
        value: item.id,
        label: item.nombre
      }))





  // Verifica si el nombre de una de las listas coincide con el path del tipo de objeto
  const objeto = (content_type) => {
    let obj

    if (content_type === 'items') {
      obj = itemNombre
    } else if (content_type === 'inventos') {
      obj = inventoNombre
    }

    return obj
  }





  // Si hay coincidencia, filtra los objetos disponibles
  const options = objeto() &&
    objeto().filter(item => !rows.some(rowItem => Number(rowItem.item) === item.id))
      .map(obj => ({
        value: obj.id,
        label: obj.nombre
      }));


  const agregarFila = () => {
    const nuevaFila = { id: rows.length, object_id: 0, cantidad: 0, content_type: 0, guia_salida: 0 };
    setRows((prevRows) => [...prevRows, nuevaFila]);
  };

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleChangeRow = (id, fieldName, value) => {
    setTipoSeleccionado(value)
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [fieldName]: value } : row))
    );
  };

  console.log(objeto(tipo_objeto))
  console.log(tipo_objeto)



  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (rows && rows.length > 0) {
      // Iterar sobre cada fila y obtener el content_type
      const tiposSeleccionados = rows.map(row => row.content_type);

      setTipoSeleccionado(tiposSeleccionados[0]);
    }
  }, [rows]);

  console.log(rows)
  console.log(tipoSeleccionado)
  return (
    <div className='py-12 px-3'>
      <form onSubmit={formik.handleSubmit} className='relative'>
        <div onClick={handleAgregarItem, agregarFila}
          className='absolute bottom-44 left-20 
            right-0 w-32 mx-auto'>
          <FaCirclePlus className='text-3xl' />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Objeto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Tipo Objeto</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row, index) => {
                const limite = objeto(tipo_objeto).find(item => item.id === row.item)?.stock_bodega

                const itemSelected = itemNombre && itemNombre.find(obj => obj.value === row.objeto_id)?.label || ""
                const inventoSelected = inventoNombre && inventoNombre.find(obj => obj.value === row.objeto_id)?.label || ""

                console.log(itemSelected)
                console.log(inventoSelected)

                return (
                  <TableRow key={index} style={{ background: '#F3F4F6' }}>
                    <TableCell component="th" scope="row" style={{ maxWidth: '250px', minWidth: '250px' }}>
                      <Select
                        showSearch
                        placeholder="Selecciona una item"
                        optionFilterProp="children"
                        className='rounded-md col-span-3 h-10 w-full'
                        onChange={value => {
                          handleChangeRow(index, "object_id", value)

                        }}
                        onSearch={onSearch}
                        name='object_id'
                        filterOption={filterOption}
                        // value={ }
                        options={options}
                      />

                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="number"
                        name="cantidad"
                        min={0}
                        max={limite}
                        className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                        onChange={(e) => {
                          handleChangeRow(index, "cantidad", e.target.value)
                          handleChange(e)
                        }

                        }
                        value={row.cantidad}
                      />
                    </TableCell>
                    <TableCell align="" style={{ maxWidth: '150px', minWidth: '150px' }}>
                      <Select
                        showSearch
                        placeholder="Selecciona una Objeto"
                        optionFilterProp="children"
                        className='rounded-md col-span-3 h-10 w-full'
                        onChange={value => {
                          handleChangeRow(index, "content_type", value)
                        }}
                        onSearch={onSearch}
                        name='content_type'
                        filterOption={filterOption}
                        value={row.content_type}
                        options={ContentTypes.map((obj) => ({
                          value: obj.value,
                          label: obj.label
                        }))}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => { eliminarFila(index), setTipoSeleccionado(0) }} variant="outlined" color="secondary">
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='bg-gray-300 h-40 w-full mt-14 mb-5 rounded-md '>
          firma
        </div>
        <button type='submit' className='absolute px-4 py-2 right-0 -bottom-14 bg-[#2732FF] rounded-md text-white'>
          Crear Orden de Compra
        </button>
      </form>
    </div>
  );
};

export default FooterFormularioEditableRegistro;

