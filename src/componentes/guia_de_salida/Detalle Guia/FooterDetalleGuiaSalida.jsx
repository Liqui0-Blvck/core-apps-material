/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
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
import SignatureCanvas from "react-signature-canvas";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from 'react-icons/io'
import { dataURLtoFile } from '@/services/captureSignature';


const FooterDetalleGuiaSalida = ({ formik, rows }) => {
  const { authTokens, validToken } = useAuth()
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null)
  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    '/api/items/'
  )

  const { data: inventos } = useAuthenticatedFetch(
    authTokens,
    validToken,
    '/api/inventos/'
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

  const objeto = (content_type) => {
    let obj
    if (content_type === 'items') {
      obj = items
    } else if (content_type === 'inventos') {
      obj = inventos
    }

    return obj
  }


  useEffect(() => {
    if (rows && rows.length > 0) {
      const tiposSeleccionados = rows.map(row => row.content_type);

      setTipoSeleccionado(tiposSeleccionados[0]);
    }
  }, [rows]);

  return (
    <div className='py-12 px-3'>
      <form onSubmit={formik.handleSubmit} className='relative'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Objeto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Tipo Objeto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ position: 'relative'}}>
              {rows && rows.map((row, index) => {
                const tipo_objeto = ContentTypes.find(obj => obj.value === row.content_type)?.path;
                const limite = objeto(tipo_objeto) && objeto(tipo_objeto).find(obj => obj.id === row.object_id)?.stock_bodega;

                const inventoSelected = inventoNombre && inventoNombre
                  .find(inventoName => inventos.some(invento => invento.id === inventoName.value && row.object_id === invento.id))

                const itemSelected = itemNombre && itemNombre
                  .find(itemName => items.some(item => item.id === itemName.value && row.object_id === item.id))

                const options = row.content_type === 13 
                  ? items && items
                      .filter(item => !rows.some(rowItem => rowItem.object_id === item.id))
                      .map(item => ({
                        value: item.id,
                        label: item.nombre
                      }))
                  : row.content_type === 31 
                    ? inventos && inventos
                        .filter(invento => !rows.some(rowItem => rowItem.object_id === invento.id))
                        .map(invento => ({
                          value: invento.id,
                          label: invento.nombre
                        }))
                    : [];


                return (
                  <TableRow key={index} style={{ background: '#F3F4F6' }}>
                    <TableCell component="th" scope="row" style={{ maxWidth: '250px', minWidth: '250px' }}>
                    <Select
                      showSearch
                      placeholder="Selecciona una item"
                      optionFilterProp="children"
                      className='rounded-md col-span-3 h-10 w-full'
                      name='object_id'
                      value={row.content_type === 13 ? itemSelected?.label : row.content_type === 31 ? inventoSelected?.label : 'Selecciona uno'}
                      options={options}
                      disabled
                    />

                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="number"
                        name="cantidad"
                        min={0}
                        max={limite}
                        className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                        value={row.cantidad}
                        disabled
                      />
                    </TableCell>
                    <TableCell style={{ maxWidth: '150px', minWidth: '150px' }}>
                      <Select
                        showSearch
                        placeholder="Selecciona una Objeto"
                        optionFilterProp="children"
                        className='rounded-md col-span-3 h-10 w-full'
                        name='content_type'
                        value={row.content_type === 0 ? 'Tipo Objeto' : row.content_type}
                        options={ContentTypes.map((obj) => ({
                          value: obj.value,
                          label: obj.label
                        }))}
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-between lg:flex-row md:flex-col flex-col items-center'>
          <div className='border border-gray-500 h-40 w-96 mt-14 mb-5 relative rounded-md flex flex-col '>
            <h1>Firma Encargado: </h1>
            <img src={formik.values.firma_encargado} alt="" className='w-full h-32'/>

          </div>

          <div className='border border-gray-500 h-40 w-96 mt-14 mb-5 relative rounded-md flex flex-col '>
            <h1>Firma Recepcionista: </h1>
            <img src={formik.values.firma_recepcion} alt="" className='w-full h-32'/>

          </div>
        </div>
      </form>
    </div>
  );
};

export default FooterDetalleGuiaSalida;

