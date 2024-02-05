import { ComponenteSchema } from '@/services/Validator';
import { compresor } from '@/services/compresor_imagen';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Input } from 'antd'

const { TextArea } = Input

export default function CartDetail({ fecha_creacion, fecha_modificacion, foto, nombre, descripcion, titulo, proveedores, editMode}) {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)

  
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
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
                <div className='border-[1px] border-gray-300 rounded h-72 flex flex-col gap-3  p-2'>

                  <div className='h-20 p-2 flex flex-col gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Nombre: </h1>
                      <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                        <span>{nombre}</span>
                      </div>
                  </div>

                  <div className='h-full p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Descripción: </h1>
                      <div className='h-full w-full rounded-md bg-gray-200 flex p-3'>
                        <span>{descripcion}</span>
                      </div>
                  </div>   

                </div>

                <div className='border-[1px] border-gray-300 rounded m-2 h-72 p-2'>
                  <div className='border-[1px] border-gray-200 h-full '>
                    <div className='flex justify-center items-center'>
                      <h1 className='text-xl font-semibold'>Proveedores</h1>
                    </div>
                    <div className='mt-2 flex items-center p-2'>
                      {
                        proveedores
                          ? (
                              <>
                                {
                                  proveedores.map((proveedor) => (
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
  );
}