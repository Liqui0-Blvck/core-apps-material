/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const BasicTable = ({ rows }) => {
  console.log(rows)

  return (
    <div className='py-12 px-3'>
      <form className='relative'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750, background: '#F3F4F6' }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align='center'>Items</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Costo por Unidad</TableCell>
                <TableCell align="right">Fecha de Llegada</TableCell>
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
                  <TableCell align="right">
                    <input
                      type="number"
                      name="unidad_de_compra"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-14"
                      value={row.unidad_de_compra}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      name="costo_por_unidad"
                      className="p-2 border-[1px] border-gray-300 rounded-md w-28"
                      value={row.costo_por_unidad}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="date"
                      name="fecha_llegada"
                      className="p-2 border-[1px] border-gray-300 rounded-md"
                      value={row.fecha_llegada}
                      disabled
                    />
                  </TableCell>
                  <TableCell align="right">
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

        {/* <button 
          type='submit'
          className='absolute px-4 py-2 right-0 
            -bottom-20 bg-[#2732FF] rounded-md
            text-white'>
          Crear Orden de Compra
        </button> */}
      </form>
    </div>
  );
};

export default BasicTable;
