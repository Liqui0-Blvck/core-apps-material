import { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import AuthContext from '@/context/AuthContext';



export default function ModalSearchItem() {
  const { authTokens, validToken } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState(null)
  const [busqueda, setBusqueda] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: items, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/items/?search=${valor}`
  )
  

  const handleInputChange = (e) => {
    const nuevoValor = e.target.value;
    setBusqueda(nuevoValor  )
    setValor(nuevoValor)
    handleOpen(true)
  };

  return (
    <div className=' bg-slate-200 rounded-md' >
      <Button onClick={handleOpen} className='text-black'>
        <Input 
          label='search' 
          type="text" 
          name='nombre'
          autoComplete='off'
          onChange={handleInputChange}
          value={busqueda} />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className='flex justify-center'
      >
        <Fade in={open}>
          <Box className='absolute mx-auto w-40% md:w-[50%] top-20 lg:w-[60%] bg-white px-8 py-10 rounded-md '>
            <form className='grid grid-cols-4 place-items-center relative'>
              <SearchIcon className='text-blue-400 absolute top-3.5 left-2 bottom-0'/>
              <Input
                label='search' 
                type="text" 
                name='nombre'
                autoComplete='off'
                onChange={handleInputChange}
                value={busqueda}
                className='border-[1px] border-gray-300 w-full rounded-md p-2 px-10 mt-1 col-span-4'/>
              </form>
            <h1 className='mt-5'>Resultados:</h1>
            <ul className='mt-2 flex flex-col gap-2 border-[1px] border-gray-400 p-4 rounded-md'>
              {
                busqueda
                  ? (
                    <>
                      {
                        items
                        .slice(0, 5)
                        .map((resultado) => (
                          <li key={resultado.id}>
                            <Link 
                              to={`item/${resultado.id}`}
                              onClick={() => handleClose(true)}
                            >
                              <div className='h-14 w-full border-[1px] border-gray-300 rounded-md grid grid-cols-5 place-items-center'>
                                <h1 className='col-start-1 col-span-4'>{resultado.nombre}</h1>
                                <span className='col-start-5'>Disponibles:{' '}{resultado.stock_bodega}</span>
                              </div>
                            </Link>
                          </li>
                        ))
                      }
                    </>
                    )
                  : (
                    <p>No hay resultados </p>
                  )
              }
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}