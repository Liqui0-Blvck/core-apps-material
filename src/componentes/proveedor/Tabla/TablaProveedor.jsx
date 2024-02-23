// /* eslint-disable react/prop-types */
// import { useState } from 'react'
// import PropTypes from 'prop-types';
// import Box from '@mui/joy/Box';
// import Table from '@mui/joy/Table';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
// import Checkbox from '@mui/joy/Checkbox';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import IconButton from '@mui/joy/IconButton';
// import Link from '@mui/joy/Link';
// import Tooltip from '@mui/joy/Tooltip';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { visuallyHidden } from '@mui/utils';
// import toast from 'react-hot-toast'
// import { Link as Ln } from 'react-router-dom'
// import { Skeleton } from '@mui/material';
// import ModalRegistroSucursal from '../Formularios/ModalRegistroSucursal';

// function labelDisplayedRows({ from, to, count }) {
//   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
// }



// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: 'nombre',
//     numeric: false,
//     disablePadding: true,
//     label: 'Nombre',
//   },
//   {
//     id: 'region_nombre',
//     numeric: true,
//     disablePadding: false,
//     label: 'Region',
//   },
//   {
//     id: 'provincia_nombre',
//     numeric: false,
//     disablePadding: false,
//     label: 'Provincia',
//   },

//   {
//     id: 'comuna_nombre',
//     numeric: false,
//     disablePadding: false,
//     label: 'Comuna',
//   },{
//     id: 'fecha_creacion',
//     numeric: false,
//     disablePadding: false,
//     label: 'Fecha_creacion',
//   }
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <thead>
//       <tr>
//         <th>
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             slotProps={{
//               input: {
//                 'aria-label': 'select all desserts',
//               },
//             }}
//             sx={{ verticalAlign: 'sub' }}
//           />
//         </th>
//         {headCells.map((headCell) => {
//           const active = orderBy === headCell.id;
//           return (
//             <th
//               key={headCell.id}
//               aria-sort={
//                 active ? { asc: 'ascending', desc: 'descending' }[order] : undefined
//               }
//             >
//               <Link
//                 underline="none"
//                 color="neutral"
//                 textColor={active ? 'primary.plainColor' : undefined}
//                 component="button"
//                 onClick={createSortHandler(headCell.id)}
//                 fontWeight="lg"
//                 startDecorator={
//                   headCell.numeric ? (
//                     <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
//                   ) : null
//                 }
//                 endDecorator={
//                   !headCell.numeric ? (
//                     <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
//                   ) : null
//                 }
//                 sx={{
//                   '& svg': {
//                     transition: '0.2s',
//                     transform:
//                       active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
//                   },
//                   '&:hover': { '& svg': { opacity: 1 } },
//                 }}
//               >
//                 {headCell.label}
//                 {active ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </Box>
//                 ) : null}
//               </Link>
//             </th>
//           );
//         })}
//       </tr>
//     </thead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected, handleDeleteClick, selected, refresh } = props;

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         py: 1,
//         gap: 2,
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: 'background.level1',
//         }),
//         borderTopLeftRadius: 'var(--unstable_actionRadius)',
//         borderTopRightRadius: 'var(--unstable_actionRadius)',
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography sx={{ flex: '1 1 100%' }} component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           level="body-lg"
//           sx={{ flex: '1 1 100%' }}
//           id="tableTitle"
//           component="div"
//         >
//           Items
//         </Typography>
//       )}

//       {
//         numSelected === 0
//           ? (
//               <Ln to={`/app/registro-proveedor/`}>
//                 <div className='w-44 p-1.5 rounded-md bg-[#F0F4F8] hover:bg-indigo-200 transition-all ease-in  flex items-center justify-center mx-auto'>
//                   <span className='font-semibold text-center'>Agregar Proveeedor</span>
//                 </div>
//               </Ln>
//             )
//           : null
//       }

//       {
//         numSelected <= 1 && numSelected > 0 
//           ? (
//             <>
//               <Ln to={`/app/proveedor/${selected}`}>
//                 <IconButton size='md' variant='solid' color='primary' className='w-24'>
//                   Detalles
//                 </IconButton>
//               </Ln>

//               <Ln to={`/app/edicion-proveedor/${selected}`}>
//                 <IconButton size='md' variant='solid' color='primary' className='w-20'>
//                   Editar
//                 </IconButton>
//               </Ln>

//               <div className='w-72 p-1.5 rounded-md bg-[#22325c] hover:bg-[#22325ccb] transition-all ease-in  flex items-center justify-center mx-auto'>
//                 <ModalRegistroSucursal id={selected} refresh={refresh}/>
//               </div>
//             </>
//             )
//           : null
//       }

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton size="sm" color="danger" variant="solid" onClick={handleDeleteClick}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : null
//       }
//     </Box>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function TablaProveedor({ data, setData, token, loading, refresh }) {

//   const [order, setOrder] = useState('desc');
//   const [orderBy, setOrderBy] = useState('fecha_creacion');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = data.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleDeleteClick = async () => {
//     try {
//       console.log("Eliminar elementos seleccionados:", selected);

  
//       // Realiza la solicitud de eliminación al servidor
//       const response = await fetch(`http://127.0.0.1:8000/api/proveedor/${selected}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ ids: selected }),
//       });

//       if (response.ok){
//         toast.success('Item eliminado con exito')
//       } else {
//         toast.error('No se ha podido eliminar')
//       }

//       const newData = data.filter(item => !selected.includes(item.id));
//       setData(newData);

//       setSelected([]);
  
//     } catch (error) {
//       console.error("Error al eliminar elementos:", error);

//     }
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event, newValue) => {
//     setRowsPerPage(parseInt(newValue.toString(), 10));
//     setPage(0);
//   };

//   const getLabelDisplayedRowsTo = () => {
//     if (data.length === -1) {
//       return (page + 1) * rowsPerPage;
//     }
//     return rowsPerPage === -1
//       ? data.length
//       : Math.min(data.length, (page + 1) * rowsPerPage);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty data.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

//   return (
//     <Sheet
//       variant="outlined"
//       sx={{ width: '95%', boxShadow: 'sm', borderRadius: 'sm' }}
//     >
//       <EnhancedTableToolbar 
//         numSelected={selected.length} 
//         handleDeleteClick={handleDeleteClick} 
//         selected={selected}
//         setRefresh={refresh}/>
//       <Table
//         aria-labelledby="tableTitle"
//         hoverRow
//         sx={{
//           '--TableCell-headBackground': 'transparent',
//           '--TableCell-selectedBackground': (theme) =>
//             theme.vars.palette.success.softBg,
//           '& thead th:nth-child(1)': {
//             width: '50px',
//           },
//           '& thead th:nth-child(2)': {
//             width: '20%',
//           },
//           '& tr > *:nth-child(n+3)': { 
//             textAlign: 'center',
//             width: '50%'
//           },
//           '& tfoot > td': {
//             width: '100%'
//           }
//         }}
//       >
//         <EnhancedTableHead
//           numSelected={selected.length}
//           order={order}
//           orderBy={orderBy}
//           onSelectAllClick={handleSelectAllClick}
//           onRequestSort={handleRequestSort}
//           rowCount={data.length}
//         />
//         <tbody>
//           {stableSort(data, getComparator(order, orderBy))
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row, index) => {
//               const isItemSelected = isSelected(row.id);
//               const labelId = `enhanced-table-checkbox-${index}`;

//               return (
//                 <tr
//                   onClick={(event) => handleClick(event, row.id)}
//                   role="checkbox"
//                   aria-checked={isItemSelected}
//                   tabIndex={-1}
//                   key={row.id}
//                   style={
//                     isItemSelected
//                       ? {
//                           '--TableCell-dataBackground':
//                             'var(--TableCell-selectedBackground)',
//                           '--TableCell-headBackground':
//                             'var(--TableCell-selectedBackground)',
//                         }
//                       : {}
//                   }
//                 >
//                   <th scope="row">
//                     <Checkbox
//                       checked={isItemSelected}
//                       slotProps={{
//                         input: {
//                           'aria-labelledby': labelId,
//                         },
//                       }}
//                       sx={{ verticalAlign: 'top', }}
//                     />
//                   </th>
//                   {loading ? (
//                       <td colSpan="5">
//                         <Skeleton className='w-full'/>
//                       </td>
//                     ) : (
//                       <>
//                         <td className='text-center text-clip overflow-hidden'>{row.nombre}</td>
//                         <td className='text-center text-clip overflow-hidden'>{row.region_nombre}</td>
//                         <td className='text-center text-clip overflow-hidden'>{row.provincia_nombre}</td>
//                         <td className='text-center text-clip overflow-hidden'>{row.comuna_nombre }</td>
//                         <td className='text-center text-clip overflow-hidden'>{row.fecha_creacion}</td>
//                       </>
//                     )}
//                 </tr>
//               );
//             })}
//           {emptyRows > 0 && (
//             <tr
//               style={{
//                 height: `calc(${emptyRows} * 40px)`,
//                 '--TableRow-hoverBackground': 'transparent',
//               }}
//             >
//               <td colSpan={5} aria-hidden />
//             </tr>
//           )}
//         </tbody>
//         <tfoot >
//           <tr>
//             <td colSpan={8}>
//               <Box
//                 sx={{
//                   width: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   justifyContent: 'flex-end',
//                 }}  
//               >
//                 <FormControl orientation="horizontal" size="sm">
//                   <FormLabel>Rows per page:</FormLabel>
//                   <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
//                     <Option value={5}>5</Option>
//                     <Option value={10}>10</Option>
//                     <Option value={25}>25</Option>
//                   </Select>
//                 </FormControl>
//                 <Typography textAlign="center" sx={{ minWidth: 80 }}>
//                   {labelDisplayedRows({
//                     from: data.length === 0 ? 0 : page * rowsPerPage + 1,
//                     to: getLabelDisplayedRowsTo(),
//                     count: data.length === -1 ? -1 : data.length,
//                   })}
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <IconButton
//                     size="sm"
//                     color="neutral"
//                     variant="outlined"
//                     disabled={page === 0}
//                     onClick={() => handleChangePage(page - 1)}
//                     sx={{ bgcolor: 'background.surface' }}
//                   >
//                     <KeyboardArrowLeftIcon />
//                   </IconButton>
//                   <IconButton
//                     size="sm"
//                     color="neutral"
//                     variant="outlined"
//                     disabled={
//                       data.length !== -1
//                         ? page >= Math.ceil(data.length / rowsPerPage) - 1
//                         : false
//                     }
//                     onClick={() => handleChangePage(page + 1)}
//                     sx={{ bgcolor: 'background.surface' }}
//                   >
//                     <KeyboardArrowRightIcon />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </td>
//           </tr>
//         </tfoot>
//       </Table>
//     </Sheet>
//   );
// }


import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import toast from 'react-hot-toast'
import { Link as Ln } from 'react-router-dom'
import { Skeleton } from '@mui/material';
import ModalRegistroSucursal from '../Formularios/ModalRegistroSucursal';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'region_nombre',
    numeric: true,
    disablePadding: false,
    label: 'Region',
  },
  {
    id: 'provincia_nombre',
    numeric: false,
    disablePadding: false,
    label: 'Provincia',
  },

  {
    id: 'comuna_nombre',
    numeric: false,
    disablePadding: false,
    label: 'Comuna',
  },{
    id: 'fecha_creacion',
    numeric: false,
    disablePadding: false,
    label: 'Fecha_creacion',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDeleteClick, selected, refresh } = props;

  return (
    <Toolbar
      sx={{
        display: 'flex',
        gap: 2,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
      className={`${numSelected > 0 ? 'bg-[#f4f7fc]' : ''}`}

    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Proveedores
        </Typography>
      )}
      
      {
        numSelected === 0
          ? (
            <Ln to={`/app/registro-proveedor`}>
              <div className='w-52 p-1.5 border border-[#224871] rounded-md bg-[#f4f7fc] hover:bg-[#224871] hover:text-white transition-all ease-in flex items-center justify-center text-[#224871]'>
                <span className='font-semibold'>Agregar Proveedor</span>
              </div>
            </Ln>
            )
          : null
      }

      {
        numSelected <= 1 && numSelected > 0 
          ? (
            <>
              <Tooltip title='Detalle'>
                <Ln to={`/app/proveedor/${selected}`}>
                <button type='button' className='bg-[#224871] hover:bg-[#224871c0] px-5 py-1.5 rounded-md text-white hover:scale-105'>
                    Detalles
                  </button>
                </Ln>
              </Tooltip>             
              
              <Tooltip title='Editar'>
                <Ln to={`/app/edicion-proveedor/${selected}`}>
                <button type='button' className='bg-[#224871] hover:bg-[#224871c0] px-5 py-1.5 rounded-md text-white hover:scale-105'>
                    Editar
                  </button>
                </Ln>
              </Tooltip>

              <Tooltip title='Agregar Sucursal'>
                <div className='w-72 p-1.5 rounded-md bg-[#22325c] hover:bg-[#22325ccb] transition-all ease-in  flex items-center justify-center mx-auto'>
                  <ModalRegistroSucursal id={selected} refresh={refresh}/>
                </div>
              </Tooltip>
              
              
            </>
            )
          : null
      }

      {numSelected > 0 ? (
        <Tooltip title="Eliminar">
          <button type='button' onClick={handleDeleteClick}>
            <DeleteIcon style={{ fontSize: '35px'}} className='text-red-800 hover:scale-110'/>
          </button>
        </Tooltip>
      ) : null 
      }
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaProveedor({ data, setData, token, loading, setRefresh }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

    const handleDeleteClick = async () => {
    try {
      console.log("Eliminar elementos seleccionados:", selected);

  
      // Realiza la solicitud de eliminación al servidor
      const response = await fetch(`http://127.0.0.1:8000/api/proveedor/${selected}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selected }),
      });

      if (response.ok){
        toast.success('Item eliminado con exito')
      } else {
        toast.error('No se ha podido eliminar')
      }

      const newData = data.filter(item => !selected.includes(item.id));
      setData(newData);

      setSelected([]);
  
    } catch (error) {
      console.error("Error al eliminar elementos:", error);

    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, data],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
         numSelected={selected.length}
         handleDeleteClick={handleDeleteClick}
         selected={selected}
         refresh={setRefresh}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, 
            '& thead th:nth-child(1)': {
              width: '30px',
            },
            '& thead th:nth-child(2)': {
              textAlign: 'left',
              width: '20%',
            },
            '& tr > *:nth-child(3)': { 
            textAlign: 'left',
            width: '30%'
            },
            '& tr > *:nth-child(4)': { 
              textAlign: 'left',
              width: '30%'
            },
            '& tr > *:nth-child(5)': { 
              textAlign: 'left',
              width: '30%'
            },
            '& tfoot > td': {
              width: '100%'
            }}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {loading ? (
                      <TableCell colSpan="5">
                        <Skeleton className='w-full'/>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className='text-clip overflow-hidden'>{row.nombre}</TableCell>
                        <TableCell className='text-clip overflow-hidden'>{row.region_nombre}</TableCell>
                        <TableCell className='text-clip overflow-hidden'>{row.provincia_nombre}</TableCell>
                        <TableCell>{row.comuna_nombre}</TableCell>
                        <TableCell className='text-clip overflow-hidden'>{row.fecha_creacion}</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component=""
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}