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


const FooterFormularioEditableRegistro = ({ formik, handleChange, rows, setRows, handleAgregarItem }) => {
  const { authTokens, validToken } = useAuth()
  const [tipoSeleccionado, setTipoSeleccionado] = useState(0)
  const sigCanvas = useRef()
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

  const objeto = (content_type) => {
    let obj

    if (content_type === 'items') {
      obj = items
    } else if (content_type === 'inventos') {
      obj = inventos
    }

    return obj
  }


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


  const handleSaveSignature = () => {
    const signatureImage = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    const signatureFile = dataURLtoFile(signatureImage, 'firma.png');

    formik.setFieldValue('firma_recepcion', signatureFile);
  };
  
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
                      onChange={value => {
                          handleChangeRow(row.id, "object_id", value)
                      }}
                      onSearch={onSearch}
                      name='object_id'
                      filterOption={filterOption}
                      value={row.content_type === 13 ? itemSelected?.label : row.content_type === 31 ? inventoSelected?.label : 'Selecciona uno'}
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
                          handleChangeRow(row.id, "cantidad", e.target.value)
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
                          handleChangeRow(row.id, "content_type", value)
                        }}
                        onSearch={onSearch}
                        name='content_type'
                        filterOption={filterOption}
                        value={row.content_type === 0 ? 'Tipo Objeto' : row.content_type}
                        options={ContentTypes.map((obj) => ({
                          value: obj.value,
                          label: obj.label
                        }))}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => { eliminarFila(row.id), setTipoSeleccionado(0) }} variant="outlined" color="secondary">
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-between'>
          <div className='border border-gray-500 h-40 w-96 mt-14 mb-5 relative rounded-md flex flex-col '>
            <h1>Firma Encargado: </h1>
            <img src={formik.values.firma_encargado} alt="" className='w-full h-32'/>
          </div>

          <div className='bg-gray-300 h-40 w-96 mt-14 mb-5 rounded-md relative flex flex-col '>
          <h1>Firma Recepcionista:</h1>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 385, height: 120 }}
            ref={sigCanvas}
          />
          <IoMdClose className='absolute top-1 right-10 text-2xl cursor-pointer' onClick={() => sigCanvas.current.clear()}/>
          <IoMdSave className='absolute top-1 right-1 text-2xl cursor-pointer' onClick={handleSaveSignature}/>

          </div>
        </div>
        
        <button type='submit' className='absolute px-4 py-2 right-0 -bottom-14 bg-[#2732FF] rounded-md text-white'>
          Crear Orden de Compra
        </button>
      </form>
    </div>
  );
};

export default FooterFormularioEditableRegistro;

