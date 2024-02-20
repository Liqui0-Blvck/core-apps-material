/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import toast from 'react-hot-toast'
import { Link as Ln } from 'react-router-dom'

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}



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
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'numero_guia',
    numeric: false,
    disablePadding: true,
    label: 'Número Guía',
  },
  {
    id: 'encargado',
    numeric: true,
    disablePadding: false,
    label: 'Encargado',
  },
  {
    id: 'destinatario',
    numeric: false,
    disablePadding: false,
    label: 'Destinatario',
  },
  {
    id: 'estado_guia',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'fecha_creacion',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Creación',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all desserts',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active ? { asc: 'ascending', desc: 'descending' }[order] : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
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
    const { numSelected, handleDeleteClick, selected, handleUpdateClick, data } = props;
    const datos = data.filter(item => selected.includes(item.id));
    const [estado, setEstado] = useState({
      label: '',
      estado_oc: null,
      resultado: false
    })

  const handleClickEstado = (label, estado, resultado) => {
    setEstado({
      label: label,
      estado_oc: estado,
      resultado: resultado
    })

    handleUpdateClick(estado)
  }

  console.log(estado)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        gap: 2,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: 'background.level1',
        }),
        borderTopLeftRadius: 'var(--unstable_actionRadius)',
        borderTopRightRadius: 'var(--unstable_actionRadius)',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="body-lg"
          sx={{ flex: '1 1 100%', font: 'semibold' }}
          id="tableTitle"
          component="div"
        >
          Guias de Salida
        </Typography>
      )}

      

     {
        numSelected === 0
        ? (
          <Ln to={`/app/registro-orden-compra`}>
            <div className='w-52 p-1.5 rounded-md bg-[#F0F4F8] hover:bg-indigo-100 transition-all ease-in flex items-center justify-center'>
              <span className='font-semibold'>Agregar Guia de Salida</span>
            </div>
          </Ln>
          )
        : null
      }

      {
      numSelected <= 1 && numSelected > 0 ? (
        <div className='flex gap-2 items-center'>
          <h1 className='mr-10'>Acciones</h1>
          

          {datos[0].estado_oc_label === 'Aprobada' || datos[0].estado_oc_label === 'Rechazada' || datos[0].estado_oc_label === 'Finalizado' ? (
            datos[0].estado_oc_label === 'Aprobada' && (
              <>
                <IconButton
                  size='md'
                  className='w-20'
                  variant='solid'
                  color='primary'
                  onClick={() => handleClickEstado('Finalizada', 5, true)}
                >
                  Finalizada
                </IconButton>
              </>
            )
          ) : (
            <>
              {numSelected === 1 && (
                <>
                  <IconButton
                    size='md'
                    className='w-20'
                    variant='solid'
                    color='primary'
                    onClick={() => handleClickEstado('Aprobada', 2, true)}
                  >
                    Aceptar
                  </IconButton>

                  <IconButton
                    size='md'
                    className='w-24'
                    variant='solid'
                    color='danger'
                    onClick={() => handleClickEstado('Rechazada', 3, true)}
                  >
                    Rechazar
                  </IconButton>
                </>
              )}
            </>
          )}

          <Ln to={`/app/guia-salida/${selected}`}>
            <IconButton size='md' variant='solid' color='primary'>
              Detalles
            </IconButton>
          </Ln>

          <Ln to={`/app/edicion-guia-salida/${selected}`}>
            <IconButton size='md' variant='solid' color='primary'>
              Editar
            </IconButton>
          </Ln>
        </div>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton size="sm" color="danger" variant="solid" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton size="sm" variant="outlined" color="neutral">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaGuiaDeSalida({ data, setData, token, setRefresh }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleUpdateClick = async (estado) => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orden-compra-update/${selected}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado_oc: estado })
      })
      if (response.ok) {
        toast.success("Acción realizada correctamente")
        setRefresh(true)
      }
    } catch (error) {
      console.log("algo mal estas haciendo")
    }
  }

  const handleDeleteClick = async () => {
    try {
      console.log("Eliminar elementos seleccionados:", selected);
  
      // Realiza la solicitud de eliminación al servidor
      const response = await fetch(`http://127.0.0.1:8000/api/guia-salida/${selected}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // 'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selected })
      });

      if (response.ok){
        toast.success('Ordenes eliminadas con exito!')
      } else {
        toast.error('No se ha podido eliminar, ¡vuelve a intentarlo!')
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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (data.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? data.length
      : Math.min(data.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Sheet
      variant="outlined"
      sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', overflowY: 'auto' }}
    >
      <EnhancedTableToolbar 
        numSelected={selected.length} 
        handleDeleteClick={handleDeleteClick} 
        selected={selected} 
        handleUpdateClick={handleUpdateClick}
        data={data}
        />
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-selectedBackground': (theme) =>
            theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': {
              width: '40px',
            position: 'relative',
          },
          '& thead th:nth-child(2)': {
            width: '30%',
          },
          '& thead th:nth-child(n+3)': {
            width: '100%',
          }
          ,
          '& tr > *:nth-child(n+3)': { 
            textAlign: 'center',
            width: '20%'
          },
          '& tfoot > td': {
            width: '100%'
          }
        }}
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={data.length}
        />
        <tbody>
          {stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  style={
                    isItemSelected
                      ? {
                          '--TableCell-dataBackground':
                            'var(--TableCell-selectedBackground)',
                          '--TableCell-headBackground':
                            'var(--TableCell-selectedBackground)',
                        }
                      : {}
                  }
                >
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{
                        input: {
                          'aria-labelledby': labelId,
                        },
                      }}
                      sx={{ verticalAlign: 'top' }}
                    />
                  </th>
                  <th className='flex items-center justify-center'>
                    <p>{row.id}</p>
                  </th>
                  <td className='text-center w-full'><p className='relative right-2'>{row.numero_guia}</p></td>
                  <td className='text-center w-full'><p className='relative left-3'>{row.encargado}</p></td>
                  <td className='text-center w-full relative'><p>{row.destinatario}</p></td>
                  <td className='text-center w-full'><p className='relative right-2'>{row.estado_guia_label}</p></td>
                  <td className='text-center w-full'><p className='relative right-2'>{row.fecha_creacion}</p></td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr
              style={{
                height: `calc(${emptyRows} * 40px)`,
                '--TableRow-hoverBackground': 'transparent',
              }}
            >
              <td colSpan={6} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot >
          <tr>
            <td colSpan={7}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}  
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: data.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: data.length === -1 ? -1 : data.length,
                  })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      data.length !== -1
                        ? page >= Math.ceil(data.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}