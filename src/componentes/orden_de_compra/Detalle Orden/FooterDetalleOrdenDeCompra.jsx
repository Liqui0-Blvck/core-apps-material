/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from "@formkit/tempo"



const FooterDetalleOrdenDeCompra = ({ rows }) => {

  return (
    <div className='py-12 px-3'>
      <div className='relative'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Items</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Costo por Unidad</TableCell>
                <TableCell align="center">Fecha de Llegada</TableCell>
                <TableCell align="center">Observaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row, index) => (
                <TableRow key={index} style={{ background: '#F3F4F6'}}>
                  <TableCell component="th" scope="row">
                    <input
                      type="text"
                      name="costo_por_unidad"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-36"
                      value={row.item_nombre}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      name="unidad_de_compra"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                      value={row.unidad_de_compra}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      name="costo_por_unidad"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-28"
                      value={row.costo_por_unidad}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      name="fecha_llegada"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      value={format(row.fecha_llegada, {date: 'long'}, 'es')}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="center">
                    <textarea
                      name="observaciones"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      value={row.observaciones}
                      disabled
                    />
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FooterDetalleOrdenDeCompra;
