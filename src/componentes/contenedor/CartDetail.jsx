import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';

export default function CartDetalle({ codigo, color, dimensiones, estado, fecha_creacion, foto, nombre, tipo}) {
  return (
    <Card className='w-full h-full mt-10'>
      <CardContent>
        <article className='w-full h-full flex gap-2'>
          <div className='w-[40%] h-full rounded-md'>
            {
              foto 
                ? (
                  <img src={foto} alt="" className='w-full h-full rounded-md'/>
                  )
                : (
                  <img src='src\assets\default.webp' alt='' className='w-full h-full object-cover rounded-md'/>
                )
            }

            <div className='h-full p-2 flex flex-col border-[1px] border-gray-300 mt-12 gap-2 rounded-md'>
              <h1 className='border-[1px] border-gray-300 rounded-md font-bold'>Fecha creación</h1>
              <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                <span>{fecha_creacion}</span>
              </div>
            </div>
          </div>

          <div className='w-full border-[1px] border-gray-300 rounded-md'>
            <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
              <h1 className='font-bold text-2xl text-gray-600'>Información del contenedor</h1>
            </div>

            <div className='grid grid-cols-2 w-full h-full'>
              <div className='border-[1px] border-gray-300 rounded m-2 h-72 flex flex-col gap-3 justify-center p-2'>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{nombre}</span>
                </div>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{codigo}</span>
                </div>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{color}</span>
                </div>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{dimensiones}</span>
                </div>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xl'>{estado}</span>
                </div>

              </div>

              <div className='border-[1px] border-gray-300 rounded m-2 h-72 p-2'>
                <div className='border-[1px] border-gray-200 h-full '>
                  Items
                </div>
              </div>
            </div>
          </div>

          
        </article>
      </CardContent>
    </Card>
  );
}