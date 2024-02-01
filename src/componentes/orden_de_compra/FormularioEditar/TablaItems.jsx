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
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { data } from 'autoprefixer';
import DatePicker from "react-multi-date-picker"





const BasicTable = ({ handleSubmit, itemProveedor, handleChange, rows, setRows, handleAgregarItem }) => {
  const navigate = useNavigate()


  const fecha_llega = rows.map(fecha => fecha.fecha_llegada)
  console.log(fecha_llega)

  const agregarFila = () => {
      const nuevaFila = { id: rows.length, item: '', unidad_de_compra: 0, costo_por_unidad: 0, fecha_llegada: '', observaciones: '' };
      setRows((prevRows) => [...prevRows, nuevaFila]);
  };
  

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleChangeRow = (id_row,id, fieldName, value) => {

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [fieldName]: value } : row))
    );
  };

  return (
    <div className='py-12 px-3'>
      <form onSubmit={handleSubmit} className='relative'>
        <div onClick={handleAgregarItem, agregarFila} 
          className='absolute -bottom-10 left-20 
            right-0 w-32 mx-auto'>
          <FaCirclePlus className='text-3xl'/>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Items</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Costo por Unidad</TableCell>
                <TableCell align="right">Fecha de Llegada</TableCell>
                <TableCell align="center">Observaciones</TableCell>
                <TableCell align="right" style={{ textAlign: 'center'}}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} style={{ background: 'white'}}>
                  <TableCell component="th" scope="row">
                    <select
                      name="item"
                      placeholder={row.item}
                      onChange={(e) => {
                        handleChangeRow(index, row.id, "item", e.target.value)
                        handleChange(e)
                      }
                      }
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      value={row.item}
                    >
                      <option value="">Seleccione un producto</option>
                      {itemProveedor.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      name="unidad_de_compra"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                      onChange={(e) => {
                        handleChangeRow(index, row.id, "unidad_de_compra", e.target.value)
                        handleChange(e)
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
                        handleChangeRow(index, row.id, "costo_por_unidad", e.target.value)
                        handleChange(e)
                      }
                        
                      }
                      value={row.costo_por_unidad}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="date"
                      name="fecha_llegada"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      onChange={(e) => {
                        handleChangeRow(index, row.id, "fecha_llegada", e.target.value)
                        handleChange(e)
                      }
                      }
                      value={row.fecha_llegada}
                    />

                  

                  </TableCell>
                  <TableCell align="right">
                    <textarea
                      name="observaciones"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      onChange={(e) => {
                        handleChangeRow(index, row.id, "observaciones", e.target.value)
                        handleChange(e)
                        }
                      }
                      value={row.observaciones}
                    />
                  </TableCell>
                  <TableCell align="right" style={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Button onClick={() => eliminarFila(row.id)} variant="outlined" color="secondary">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button 
          type='submit'
          className='absolute px-4 py-2 right-0 
            -bottom-20 bg-[#2732FF] rounded-md
            text-white'>
          Actualizar Orden de Compra
        </button>
      </form>
    </div>
  );
};

export default BasicTable;
