import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useNavigate } from 'react-router';



export default function CartDetail({ fecha_creacion, foto, nombre, descripcion, titulo}) {
  const navigate = useNavigate()

  return (
    <Card className='w-full h-full mt-10'>
      <CardContent>
        <article className='w-full h-full flex gap-2'>
          <div className='w-[40%] h-full rounded-md'>
            <div className='w-full h-56 border-[1px] border-gray-300 rounded-md'>
            {
              foto 
                ? (
                  <img src={foto} alt="" className='w-full h-full rounded-md'/>
                  )
                : (
                  <img src='src\assets\default.webp' alt='' className='w-full h-full object-cover rounded-md'/>
                )
            }
            </div>

            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 mt-12 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Fecha creación</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span>{fecha_creacion}</span>
              </div>
            </div>
          </div>

          <div className='w-full border-[1px] border-gray-300 rounded-md'>
            <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
              <h1 className='font-bold text-2xl text-gray-600'>Información del {titulo}</h1>
            </div>

            <div className='grid grid-cols-2   w-full h-full'>
              <div className='border-[1px] border-gray-300 rounded m-2 h-72 flex flex-col gap-3  p-2'>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{nombre}</span>
                </div>
                <div className='h-32 rounded-md bg-gray-200 flex p-5 mt-2'>
                  <span className='text-xl'>{descripcion}</span>
                </div>
              </div>

              <div className='border-[1px] border-gray-300 rounded m-2 h-72 p-2'>
                <div className='border-[1px] border-gray-200 h-full '>
                  <div className='grid grid-rows-2 h-16 '>
                    <div className='border-[1px] border-gray-200'>
                      <h1 className='text-xl font-semibold'>Proveedores</h1>
                    </div>
                    
                    <div className='flex gap-2 justify-center items-center p-2 border-[1px] border-gray-200 h-14'>
                      <div 
                        className='w-full h-10 rounded-md  bg-blue-600 hover:bg-blue-200 flex justify-center items-center cursor-pointer'
                        onClick={() => navigate('/proveedor-registro')}>
                        <span className='font-bold text-white'>Agregar</span>
                      </div>
                      <div 
                        className='w-full h-10 rounded-md bg-red-500 hover:bg-red-400 flex justify-center items-center cursor-pointer'
                        onClick={() => navigate('/')}>
                        <span className='font-bold text-white'>Eliminar</span>
                      </div>
                    </div>
                  </div>
                  <div className=''>

                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </article>
      </CardContent>
    </Card>
  );
}