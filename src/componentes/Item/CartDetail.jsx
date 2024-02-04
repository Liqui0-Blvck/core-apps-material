import { ComponenteSchema } from '@/services/Validator';
import { compresor } from '@/services/compresor_imagen';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Input } from 'antd'

const { TextArea } = Input

export default function CartDetail({ fecha_creacion, foto, nombre, descripcion, titulo, proveedores, editMode, editable, token}) {
  const [filename, setFilename] = useState('No hay ninguna foto seleccionada')
  const [imagen, setImagen] = useState(null)
  
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      foto: '',
    },
    validationSchema: ComponenteSchema,
    onSubmit: async (values) => {
  
      // Crear un FormData para enviar el archivo correctamente
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('foto', values.foto);

      console.log(formData)
  
      try {
        const response = await fetch('http://localhost:8000/api/item/', {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token.access}`
          },
          body: formData, // Usa el FormData directamente para enviar el archivo
        });
  
        if (response.ok) {
          toast.success('Item añadido correctamente!');
          formik.setValues(formik.initialValues);
          navigate('/item/')
        } else {
          toast.error('Error al añadir el item');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });

  console.log(formik.values)
  console.log(editable)
  return (
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    <Card className='w-full h-full mt-10'>
      <CardContent>
        
          <article className='w-full h-full flex gap-2 flex-col-reverse md:flex-row'>
            <div className='md:w-[40%] h-full rounded-md'>
              {
                !editable
                  ? (
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
                    )
                  : (
                    <div 
                      className='row-span-2 col-span-2 border-[2px] h-44 border-dashed border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
                      onClick={() => document.getElementById('input-field').click()}>
                      <h1 className='font-semibold text-center'>{filename}</h1>
                      <input
                        type='file'
                        name='foto'
                        accept='image/*'
                        onChange={async (e) => {
                          
                          if (e.currentTarget.files){
                            const compresor_result = await compresor(e.currentTarget.files[0], 0.6)
                            if (compresor_result){
                              const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                              setImagen(file)
                              formik.setFieldValue('foto', file)
                              setFilename('Foto seleccionada')
                            }
                          }
                      }}
                        className='hidden'
                        id='input-field'/>

                      {
                        imagen &&  (
                          <>
                          <div className='absolute h-7 w-7 bg-red-800 rounded-full flex justify-center items-center -right-2 -top-2 cursor-pointer z-20'>
                                  <IoMdClose 
                                    className='absolute text-2xl text-white z-100'
                                    onClick={() => {
                                      setImagen(null)
                                      setFilename('No hay ninguna foto seleccionada')
                                    }}
                                  />
                                </div>
                          <img src={URL.createObjectURL(imagen)} alt="" className='z-10 absolute w-full h-full object-contain rounded-md first-letter:'/>
                          </>
                          )
                      }
                    </div>
                    )
              }

              <div className='h-full p-2 flex flex-col  mt-12 gap-2 rounded-md'>
                <h1 className='border-[1px] border-gray-300 rounded-md font-bold text-center'>Fecha creación</h1>
                <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                  <span>{fecha_creacion}</span>
                </div>
              </div>  
            </div>

            <div className='w-full border-[1px] border-gray-300 rounded-md'>
              <div className='h-12 border-[1px] border-gray-300 rounded m-2 flex justify-center items-center col-span-2'>
                <h1 className='font-bold text-2xl text-gray-600'>Información del {titulo}</h1>
                {
                  editable
                    ? <button type='submit'>Guardar cambios</button>
                    : <div onClick={() => editMode(true)}>Editar</div>
                }
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-2  w-full h-full'>
                <div className='border-[1px] border-gray-300 rounded h-72 flex flex-col gap-3  p-2'>

                  <div className='h-20 p-2 flex flex-col gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Nombre: </h1>
                    {
                      !editable
                        ? (
                          <div className='h-10 rounded-md bg-gray-200 flex items-center justify-center '>
                            <span>{nombre}</span>
                          </div>
                          )
                        : (
                          <>
                            <Input
                              type="text"
                              name='nombre'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.nombre}
                              className={`
                              ${formik.errors.username && formik.touched.username 
                                ? 'border-[2px] text-red-900' 
                                : 'border-[1px] border-gray-300'}
                              rounded-md p-2 mt-1 col-span-2`
                              }/>
                          </>
                          )
                    }
                  </div>

                  <div className='h-full p-2 flex flex-col flex-1 gap-2 rounded-md'>
                    <h1 className='border-[1px] border-gray-300 rounded-md font-bold pl-2'>Descripción: </h1>
                    {
                      !editable
                        ? (
                          <div className='h-full w-full rounded-md bg-gray-200 flex p-3'>
                            <span>{descripcion}</span>
                          </div>
                          )
                        : (
                          <TextArea
                            rows={6} 
                            name='descripcion'
                            className='col-span-2'
                            placeholder="Largo máximo 50"
                            maxLength={101} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            resize='none'
                            />
                          )
                    }
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
    </form>
  );
}