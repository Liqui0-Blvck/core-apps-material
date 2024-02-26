import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useContext } from 'react';
import { Typography } from 'antd'
import AuthContext from '@/context/AuthContext';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import ModalUsuarioEquipo from '../Modal/ModalUsuarioEquipo';
import toast from 'react-hot-toast';

export default function CartDetail(
  { 
    titulo,
    id_equipo,
    marca,
    codigo,
    procesador,
    detalle_procesador,
    ram,
    tipo_disco,
    capacidad_disco,
    licencia,
    numero_serie,
    fecha_compra,
    observaciones,
    usuarios,
    token,
    fecha_modificacion,
    fecha_creacion,
    refresh
  }) {

  const handleDeleteUsuario = async (id) => {
    const base_url = import.meta.env.VITE_BASE_URL
    const response = await fetch(`${base_url}/api/equipo-usuario/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok){
      toast.success('Usuario desvinculado de equipo existosamente!')
      refresh(true)
    } else {
      toast.error('No se pudo desvincular el usuario, vuelve a intentarlo')
    }
  }

  const handleActiveUsuario = async (id) => {
    const response = await fetch(`${base_url}/api/equipo-usuario-update/${id}/`, {
      method: 'PUT',
      headers: {  
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })

    if (response.ok){
      refresh(true)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Card className='w-full'>
        <CardContent>
            <article className='w-full h-full flex gap-2 flex-col-reverse md:flex-row'>
              <div className='w-full border-[1px] border-gray-300 rounded-md'>
                <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
                  <h1 className='font-bold text-2xl text-gray-600'>Información del {titulo}</h1>
                </div>

                <div className=' w-full '>
                  <div className='rounded grid lg:grid-cols-6 h-80 gap-x-5 p-2 overflow-y-scroll'>

                    <div className='h-full col-span-2 p-2 flex flex-col  gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Marca: </h1>
                        <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                          <span>{marca}</span>
                        </div>
                    </div>

                    <div className='h-full col-start-3 col-span-2 p-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Codigo: </h1>
                        <div className='h-10 flex items-center justify-center w-full rounded-md bg-gray-200 p-3'>
                          <span>{codigo}</span>
                        </div>
                    </div>

                    <div className='h-full p-2 col-start-5 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Procesador: </h1>
                        <div className='h-10 w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{procesador}</span>
                        </div>
                    </div>

                    <div className='h-full p-2 row-start-2 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Detalle Procesador:  </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{detalle_procesador}</span>
                        </div>
                    </div>
                    
                    <div className='h-full p-2 row-start-2 col-start-3 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Cantidad de Ram: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{ram}</span>
                        </div>
                    </div>
                    
                    <div className='h-full p-2 row-start-2 col-start-5 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Tipo Disco: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{tipo_disco}</span>
                        </div>
                    </div>
                    
                    <div className='h-full p-2 row-start-3  col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Capacidad Disco: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{capacidad_disco}</span>
                        </div>
                    </div>
                    
                    <div className='h-full p-2 row-start-3 col-start-3 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Tipo Licencia: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{licencia}</span>
                        </div>
                    </div>
                    
                    <div className='h-full p-2 row-start-4 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Número de serie: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{numero_serie}</span>
                        </div>
                    </div>

                    <div className='h-full p-2 row-start-3 col-start-5 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Fecha de Compra: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{fecha_compra}</span>
                        </div>
                    </div>

                    <div className='h-full p-2 row-start-4 col-start-5 col-span-2 flex flex-col flex-1 gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Observaciones: </h1>
                        <div className='h-full w-full rounded-md bg-gray-200 flex justify-center items-center p-3'>
                          <span>{observaciones}</span>
                        </div>
                    </div>

                    <div className='h-full p-2 row-start-4 col-start-3 col-span-2 flex flex-col gap-2 rounded-md'>
                      <h1 className='border-[1px] border-gray-300 rounded-md font-bold text-center'>{
                            fecha_creacion !== fecha_modificacion
                              ? 'Fecha Modificación'
                              : 'Fecha Creación'
                          }</h1>
                      <div className='h-full rounded-md bg-gray-200 flex items-center justify-center '>
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
                </div>
              </div>
            </article>
              
        </CardContent>
      </Card>

      <Card>
        <div className='flex justify-between items-center w-full h-12 px-5'>
          <h1 className='font-bold'>Usuarios Asignados</h1>

          <div 
            className='w-40 h-10 bg-[#224871] hover:bg-[#224871c0] rounded-md flex items-center justify-center'>
            <ModalUsuarioEquipo id={id_equipo} refresh={refresh}/>
          </div>
        </div>
        <CardContent>
          <div className='flex flex-wrap gap-5 px-5'>
            {
              usuarios && usuarios.map((usuario) => {
                return (
                <div className='relative'>
                  <ClearIcon className='absolute z-20 right-1 top-1 text-black hover:scale-125' onClick={() => handleDeleteUsuario(usuario.id)}/>
                  <div 
                    className={`absolute left-1 top-1 z-20 border border-gray-300 w-16 h-6 
                      rounded-md flex items-center justify-center ${usuario.activo ? 'bg-[#1F6764]' : 'bg-white'}`}
                    onClick={() => handleActiveUsuario(usuario.id)}  
                    >
                    <span className={`${usuario.activo ? 'text-white' : 'text-black'}`}>{usuario.activo ? 'Activo' : 'Activar'}</span>
                  </div>
                  <Card sx={{ width: 200 , display: 'flex', alignItems: 'center', paddingTop: '30px'}}>
                    <div>
                      <Typography className={`text-center text-lg font-semibold text-black`}>{usuario.usuario_nombre}</Typography>
                      <Typography className={`text-center text-md font-semibold text-black`}>{usuario.usuario_departamento}</Typography>
                      
                    </div>

                    
                    <CardContent>
                      <Link to={`/app/usuario/${usuario.usuario}`} >
                        <button type='button' className='w-32 bg-[#1F6764] hover:bg-[#1f6763b4] p-1 rounded-md text-white font-semibold'>
                          Ver usuario
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
                ) 
              })
            }
          </div>
        </CardContent>
      </Card>

      {/* <Card>
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
                                    <p className="text-start text-gray-700">{historiaMismo.history_change_reason ? historiaMismo.history_change_reason : 'Item creado' }</p>
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
      </Card> */}
    </div>
  );
}

