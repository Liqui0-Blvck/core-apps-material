/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FaCirclePlus } from "react-icons/fa6";
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { useAuth } from '@/context/AuthContext';
import { Select } from 'antd';

const FooterFormularioRegistroInvento = ({ rows, setRows, handleAgregarItem }) => {
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
    const nuevaFila = { id: rows.length, item: '', cantidad: 0 };
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
    <div className='w-full h-full rounded-md mb-20'>
      <div 
        className='absolute bottom-10 left-20 
        right-0 w-32 mx-auto'>
        <FaCirclePlus onClick={agregarFila} className='text-3xl' />
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 750, background: 'white'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Items</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row, index) => {
              const limite = items && items.find(item => item.id === row.item)?.stock_bodega
              return (
                <TableRow key={index} style={{ background: 'white', margin: 'auto' }}>
                  <TableCell component="th" scope="row" style={{ maxWidth: 200, minWidth: 200 }}>
                    <Select
                      showSearch
                      placeholder="Selecciona una item"
                      optionFilterProp="children"
                      className='rounded-md col-span-3 h-10 w-full'
                      onChange={value => {
                        handleChangeRow(index, "item", value)
                      }}
                      onSearch={onSearch}
                      name='item'
                      filterOption={filterOption}
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
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <button type='button'
                      onClick={() => eliminarFila(row.id)}
                      className='border border-red-800 px-4 py-2 rounded-md 
                      hover:scale-110 hover:bg-red-700 text-red-800 hover:text-white'>
                      Eliminar
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default FooterFormularioRegistroInvento;
