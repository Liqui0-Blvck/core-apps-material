import { ComponenteSchema } from '@/services/Validator';
import { compresor } from '@/services/compresor_imagen';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useFormik } from 'formik';
import { useContext, useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Input, Timeline } from 'antd'
import AuthContext from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { Link, useLocation } from 'react-router-dom';
import { urlNumeros } from '@/services/url_number';

const { TextArea } = Input

export default function CartDetail({ fecha_creacion, fecha_modificacion, foto, nombre, descripcion, titulo, proveedores}) {
  const { authTokens, validToken } = useContext(AuthContext)
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)

  const { data: historial } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/historia/${id}`
  )
  

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log(historial)

  const formatearFecha = useMemo(() => (fecha, tipo) => {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: `${tipo}`,
        day: 'numeric'
      })
    },
    []
  )

  return (
    <div className='flex flex-col gap-2'>
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
                      <div className='mt-2 flex flex-col gap-2 items-center p-2 overflow-y-scroll'>
                        {
                          proveedores
                            ? (
                                <>
                                  {
                                    proveedores.map((proveedor) => (
                                      <Link to={`/app/proveedor/${proveedor.id}`} key={proveedor.id} className='bg-blue-gray-500 hover:bg-blue-gray-300 w-full flex justify-center h-10 items-center rounded-md'>
                                        <h1 className='text-lg text-white font-bold'>{proveedor.nombre}</h1>
                                      </Link>
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
          <h1 className='mb-10'>Historial</h1>
          <div className='h-full w-full flex flex-col overflow-y-scroll bg-[#F4F6F9]'>
            {
              historial && historial.map((historia, index) => {
                const mismoDia = index === 0 || historial[index - 1].history_date.slice(0, 10) !== historia.history_date.slice(0, 10);

                let contador = 0;
                const historiaMismoDia = [];

                if (mismoDia) {
                  for (let i = index; i < historial.length; i++) {
                    if (historial[i].history_date.slice(0, 10) === historia.history_date.slice(0, 10)) {
                      contador++;
                      historiaMismoDia.push(historial[i]);
                    } else {
                      break;
                    }
                  }
                }

                return (
                  <div key={index}>
                    {mismoDia && (
                      <div className="flex justify-between p-5">
                        <div className="flex flex-col items-center relative">
                          <div className="h-12 w-full bg-green-600 rounded-md flex items-center justify-center px-2 z-20">
                            <span className="text-center font-semibold text-white">
                              {formatearFecha(historia.history_date, 'long')}
                            </span>
                          </div>
                          <div className="w-2 bg-gray-400 absolute h-full rounded-md top-10" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                          {historiaMismoDia.map((historiaMismo, i) => (
                            <div className="w-full h-full px-4" key={i}>
                              <div className="shadow-md border-gray-50 w-full h-full rounded-md grid grid-rows-6 bg-white">
                                <div className="grid grid-cols-5 row-span-2 h-full items-center">
                                  <div className="col-span-3 px-2 flex items-center gap-2">
                                    <h3 className="font-semibold text-md text-ellipsis">{historiaMismo.history_change_reason ? historiaMismo.history_change_reason.slice(0, 22) : ''}</h3>
                                  </div>
                                  <div className="col-start-5 flex justify-end px-5 items-center gap-3">
                                    <span className="text-sm text-gray-500"><i className="fas fa-clock mr-1"></i>{formatearFecha(historiaMismo.history_date, 'numeric')}</span>
                                  </div>
                                  <div className="row-start-2 col-span-5 border-t border-gray-400" />
                                </div>
                                <div className="row-start-3 row-span-4 px-3 py-1 mx-auto w-full">
                                  <div className="w-full">
                                    <p className="text-start text-gray-700">{historiaMismo.history_change_reason}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

