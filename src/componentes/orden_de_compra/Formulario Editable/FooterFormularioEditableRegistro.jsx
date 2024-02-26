/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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

const FooterFormularioEditableRegistro = ({ formik, rows, setRows }) => {
  const { authTokens, validToken } = useAuth()
  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/items/`
  )

  const options = items &&
    items.filter(item => !rows.some(rowItem => Number(rowItem.item) === item.id))
      .map(item => ({
        value: item.id,
        label: item.nombre
      }))


  const agregarFila = () => {
    const nuevaFila = { id: rows.length, item: '', unidad_de_compra: 0, costo_por_unidad: 0, fecha_llegada: '', observaciones: '' };
    setRows((prevRows) => [...prevRows, nuevaFila]);
  };

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleChangeRow = (id, fieldName, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [fieldName]: value } : row))
    );
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };


  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  return (
    <div className='py-12 px-3'>
      <form onSubmit={formik.handleSubmit} className='relative'>
        <div onClick={agregarFila}
          className='absolute -bottom-10 left-20 
            right-0 w-32 mx-auto'>
          <FaCirclePlus className='text-3xl' />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Items</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Costo por Unidad</TableCell>
                <TableCell align="center">Observaciones</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row, index) => (
                <TableRow key={index} style={{ background: '#F3F4F6' }}>
                  <TableCell component="th" scope="row" style={{ maxWidth: '300px', minWidth: '300px'}}>
                    <Select
                      showSearch
                      placeholder="Selecciona una item"
                      optionFilterProp="children"
                      className='rounded-md col-span-3 h-10 w-full'
                      onChange={value => {
                        formik.setFieldValue('item', value)
                      }}
                      onSearch={onSearch}
                      name='item'
                      value={items && items.find(item => item.id === row.item)?.nombre}
                      filterOption={filterOption}
                      options={options}
                    />

                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      name="unidad_de_compra"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                      onChange={(e) => {
                        handleChangeRow(row.id, "unidad_de_compra", e.target.value)
                      }

                      }
                      value={row.unidad_de_compra}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      name="costo_por_unidad"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-28"
                      onChange={(e) => {
                        handleChangeRow(row.id, "costo_por_unidad", e.target.value)
                      }

                      }
                      value={row.costo_por_unidad}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <textarea
                      name="observaciones"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      onChange={(e) => {
                        handleChangeRow(row.id, "observaciones", e.target.value)
                      }
                      }
                      value={row.observaciones}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <button type='button'
                      onClick={() => eliminarFila(row.id)}
                      className='border border-red-800 px-4 py-2 rounded-md 
                          hover:scale-110 hover:bg-red-700 text-red-800 hover:text-white'>
                      Eliminar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button type='submit' className='absolute px-4 py-2 right-0 -bottom-20 bg-[#2732FF] rounded-md text-white'>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default FooterFormularioEditableRegistro;

