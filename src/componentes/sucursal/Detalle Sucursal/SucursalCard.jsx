import AuthContext from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { urlNumeros } from '@/services/url_number';
import { useAccordion } from '@material-tailwind/react';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const SucursalCard = () => {
  const { authTokens , validToken } = useContext(AuthContext)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: sucursal } = useAuthenticatedFetch(
    authTokens ,
    validToken,
    `http://127.0.0.1:8000/api/sucursal/${id}/`
  )

  console.log(id)
  console.log(sucursal)

  return (
    <Card className='w-full h-full mt-10'>
      <CardContent>
          <article className='w-full h-full flex gap-2 flex-col-reverse md:flex-row'>
           
            <div className='w-full border-[1px] border-gray-300 rounded-md'>
              <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
                <h1 className='font-bold text-2xl text-gray-600'>Información de la Sucursal</h1>
              </div>

              <div className='w-full h-full p-2'>
                <div 
                  className='w-full h-72 border-[1px]
                   border-gray-300 rounded-md gap-3 p-2
                    grid grid-cols-3 grid-rows-2  
                   '>

                  <div className='h-24 p-2 flex flex-col gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Nombre: </h1>
                      <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                        <span>{sucursal && sucursal.nombre}</span>
                      </div>
                  </div>

                  <div className='h-24 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Dirección: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 p-3 flex items-center justify-center'>
                        <span>{sucursal && sucursal.direccion}</span>
                      </div>
                  </div>

                  <div className='h-24 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Fecha creación: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 flex items-center justify-center p-3'>
                        <span>{sucursal && sucursal.fecha_creacion}</span>
                      </div>
                  </div> 

                  <div className='h-24 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Región: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 flex items-center justify-center p-3'>
                        <span>{sucursal && sucursal.region_nombre}</span>
                      </div>
                  </div> 

                  <div className='h-24 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Provincia: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 flex items-center justify-center p-3'>
                        <span>{sucursal && sucursal.provincia_nombre}</span>
                      </div>
                  </div> 

                  <div className='h-24 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Comuna: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 flex items-center justify-center p-3'>
                        <span>{sucursal && sucursal.comuna_nombre}</span>
                      </div>
                  </div> 

                </div>
              </div>
            </div>
          </article>
            
      </CardContent>
    </Card>
  )
}

export default SucursalCard
