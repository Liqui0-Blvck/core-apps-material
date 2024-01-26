import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useNavigate } from 'react-router';



export default function CartDetail({ fecha_creacion, estado, nombre, solicitado, titulo, numero_ct, items}) {
  const navigate = useNavigate()

  return (
    <Card className='w-full h-full mt-10'>
      <CardContent>
        <article className='w-full h-full flex gap-2'>
          <div className='w-[20%] h-full rounded-md flex flex-col gap-1.5 justify-center '>
            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Fecha creación</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span style={{ gridTemplateColumns: ''}}>{fecha_creacion}</span>
              </div>
            </div>

            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Estado</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span >{estado}</span>
              </div>
            </div>

            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Solicitante</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span>{solicitado}</span>
              </div>
            </div>

            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Solicitante</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span>{numero_ct}</span>
              </div>
            </div>
          </div>

          <div className='w-full border-[1px] border-gray-300 rounded-md'>
            <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
              <h1 className='font-bold text-2xl text-gray-600'>Información del {titulo}</h1>
            </div>

            <div className='flex flex-col w-full h-full'>
              <div className='border-[1px] border-gray-300 rounded m-2 h-14 flex flex-col gap-3  p-2'>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{nombre}</span>
                </div>
              </div>

              <div className='border-[1px] border-gray-300 rounded m-2 h-72 p-2'>
                <div className='border-[1px] border-gray-200 h-full '>
                  <div className='grid grid-rows-2 h-16 '>
                    <div className='border-[1px] border-gray-200'>
                      <h1 className='text-xl font-semibold'>Proveedores</h1>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {
                      items.map((item) => (
                        <div className='w-[90%] mx-auto rounded-md h-8 bg-slate-400 flex items-center justify-center '>
                          <span className='text-white'
                            onClick={() => navigate(`/item/${item.id}`)}
                          >{item.nombre}</span>
                        </div>
                      ))
                    }
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

