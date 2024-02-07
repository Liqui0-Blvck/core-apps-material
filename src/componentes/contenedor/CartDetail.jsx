import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';

export default function CartDetalle({ 
  titulo, 
  codigo, 
  color, 
  dimensiones, 
  estado, 
  fecha_creacion, 
  fecha_modificacion, 
  foto, 
  nombre,
  items,
  tipo,
  espacios}) {
  return (
    <div className='flex flex-col gap-3 mb-10'>
      <Card className='w-full h-full mt-10'>
        <CardContent>
            <article className='w-full h-full flex gap-2 flex-col-reverse md:flex-row'>
              <div className='md:w-[40%] h-full rounded-md'>
                <div className='w-full h-56 border-[1px] border-gray-300 rounded-md'>
                  {
                    foto 
                      ? (
                        <img src={foto} alt="" className='w-full h-full rounded-md'/>
                        )
                      : (
                        <img src='\img\default.webp' alt='' className='w-full h-full object-cover rounded-md'/>
                      )
                  }
                </div>

                <div className='h-full p-2 flex flex-col  mt-12 gap-2 rounded-md'>
                  <h1 className='border-[1px] border-gray-300 rounded-md font-bold text-center'>{
                        fecha_creacion !== fecha_modificacion
                          ? 'Fecha Modificación'
                          : 'Fecha Creación'
                      }</h1>
                  <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                    <span>
                      {
                        fecha_creacion !== fecha_modificacion
                          ? fecha_modificacion
                          : fecha_creacion
                      }
                    </span>
                  </div>
                </div>  
              </div>

              <div className='w-full border-[1px] border-gray-300 rounded-md'>
                <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
                  <h1 className='font-bold text-2xl text-gray-600'>Información del {titulo}</h1>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-2  w-full h-full'>
                  <div className='border-[1px] border-gray-300 rounded h-72 flex flex-col gap-3 p-2 overflow-y-scroll'>

                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Nombre: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{nombre}</span>
                        </div>
                    </div>

                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Codigo: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{codigo}</span>
                        </div>
                    </div>

                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Dimensiones: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{dimensiones}</span>
                        </div>
                    </div>

                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Estado: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{estado}</span>
                        </div>
                    </div>
                    
                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Color: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{color}</span>
                        </div>
                    </div>

                    <div className='h-14 p-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Tipo: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{tipo}</span>
                        </div>
                    </div> 

                  </div>

                  <div className='border-[1px] border-gray-300 rounded m-2 h-72 p-2 overflow-y-scroll'>
                    <div className='border-[1px] border-gray-200 h-full '>
                      <div className='flex justify-center items-center'>
                        <h1 className='text-xl font-semibold'>Items</h1>
                      </div>
                      <div className='mt-2 flex items-center p-2'>
                        {
                          items
                            ? (
                                <>
                                  {
                                    items.map((proveedor) => (
                                      <div key={proveedor.id} className='bg-blue-gray-100 w-full flex justify-center h-10 items-center rounded-md'>
                                        <h1 className='text-lg font-bold'>{proveedor.nombre}</h1>
                                      </div>
                                    ))
                                  }
                                </>
                              )
                            : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
              
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h1>Espacios en contenedores</h1>

          <div className='w-full h-40 flex gap-2 '>
            {
              espacios.map((espacio, index) => {
                console.log(espacio)
                return (
                  <div className={`w-full flex gap-2`}>
                    <div className={`border border-gray-300 w-full h-40 `}>
                      <h1>Espacio {index}</h1>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </CardContent>
      </Card>
    </div>

  );
}