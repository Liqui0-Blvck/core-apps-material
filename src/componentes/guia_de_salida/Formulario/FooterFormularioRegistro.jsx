/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaCirclePlus } from "react-icons/fa6";
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { useAuth } from '@/context/AuthContext';
import { Select } from 'antd';
import SignatureCanvas from "react-signature-canvas";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from 'react-icons/io'
import { dataURLtoFile } from '@/services/captureSignature';


const FooterFormularioRegistro = ({ formik, rows, setRows }) => {
  const { authTokens, validToken } = useAuth()
  const [tipo_objeto, setTipoObjeto] = useState(0)
  const sigCanvas = useRef()
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

  const { data: content_types } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/content-types/`
  )
  const tipo_objeto_seleccionado = content_types && content_types.find(ct => ct.id === tipo_objeto)?.app_label
  const { data: objeto } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/${tipo_objeto_seleccionado}/`
  )

    

  const agregarFila = () => {
    const nuevaFila = { id: rows.length,  object_id: 0, cantidad: 0, content_type: 0, guia_salida: 0 };
    setRows((prevRows) => [...prevRows, nuevaFila]);
  };

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleChangeRow = (id, fieldName, value) => {
    setTipoObjeto(value)
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

  const handleSaveSignature = () => {
    const signatureImage = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    const signatureFile = dataURLtoFile(signatureImage, 'firma.png');

    formik.setFieldValue('firma_encargado', signatureFile);
  };

  return (
    <div className='py-12 px-3'>
      <form onSubmit={formik.handleSubmit} className='relative'>
        <div onClick={agregarFila}
          className='absolute bottom-44 left-20 
            right-0 w-32 mx-auto cursor-pointer'>
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
                const limite = objeto && objeto.find(item => item.id === row.object_id)?.stock_bodega
                const tipo_seleccionado = content_types && content_types.find(ct => ct.id === row.content_type)?.app_label
                const options = tipo_seleccionado === 'items'
                  ? items && items
                      .filter(item => !rows.some(rowItem => rowItem.object_id === item.id))
                      .map(item => ({
                        value: item.id,
                        label: item.nombre
                      }))
                  : tipo_seleccionado === 'invento'
                    ? inventos && inventos
                        .filter(invento => !rows.some(rowItem => rowItem.object_id === invento.id))
                        .map(invento => ({
                          value: invento.id,
                          label: invento.nombre
                        }))
                    : []

                return (
                <TableRow key={index} style={{ background: '#F3F4F6' }}>
                  <TableCell component="th" scope="row" style={{maxWidth: '250px', minWidth: '250px'}}>
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
                      options={options}
                      disabled={row.content_type === 0 && row.object_id === 0}
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
                      }

                      }
                      value={row.cantidad}
                      disabled={row.content_type == 0}
                    />
                  </TableCell>
                  <TableCell style={{maxWidth: '150px', minWidth: '150px'}}>
                    <Select
                        showSearch
                        placeholder="Selecciona una Objeto"
                        optionFilterProp="children"
                        className='rounded-md col-span-3 h-10 w-full'
                        onChange={value => {
                          handleChangeRow(index, "content_type", value)
                          setTipoObjeto(value)
                        }}
                        onSearch={onSearch}
                        name='content_type'
                        filterOption={filterOption}
                        options={content_types && content_types.map((obj) => ({
                          value: obj.id,
                          label: obj.model
                        }))}
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
              )})}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div className='border border-gray-500 h-40 w-96 mt-14 mb-5 rounded-md relative flex flex-col px-2 py-1'>
          <h1 className='text-gray-500'>Firma Encargado:</h1>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 385, height: 155 }}
            ref={sigCanvas}
          />
          <IoMdClose className='absolute top-1 right-10 text-2xl cursor-pointer' onClick={() => sigCanvas.current.clear()}/>
          <IoMdSave className='absolute top-1 right-1 text-2xl cursor-pointer' onClick={handleSaveSignature}/>

        </div>
        <button type='submit' className='absolute px-4 py-2 right-0 -bottom-14 bg-[#2732FF] rounded-md text-white'>
          Crear Guia de Salida
        </button>
      </form>
    </div>
  );
};

export default FooterFormularioRegistro;

