import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { useFormik } from 'formik'
import { Input, Select, Switch } from 'antd'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { TIPOS_OPERARIO } from '@/const/constantes'

const FormularioRegistroOperarios = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      rut: "",
      tipo_operario: null,
      activo: false,
      etiquetas: "",
      pago_x_kilo: null
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${base_url}/api/registros/operarios/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values
          })
        })
        if (res.ok) {
          toast.success("El operario fue registrado exitosamente!!")
          navigate('/app/lista-operarios')

        } else {
          toast.error("No se pudo registrar el camión volver a intentar")
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const onSearch = (value) => {
    console.log("search:", value);
  };


  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log(formik.values)
  return (
    <MaxWidthWrapper>
      <form 
        onSubmit={formik.handleSubmit}
        className='flex flex-col 
          md:grid md:grid-cols-4 gap-x-4 gap-y-8 mt-10 
          relative p-4 border border-gray-200 rounded-md'
        >
        <div className='md:col-span-2 md:flex-col items-center'>
          <label htmlFor="nombre">Nombre: </label>
          <Input 
            name='nombre'
            onChange={formik.handleChange}
            className='py-3'
          />
        </div>

        <div className='md:col-span-2 md:col-start-3 md:flex-col items-center'>
          <label htmlFor="apellido">Apellido: </label>
          <Input 
            name='apellido'
            onChange={formik.handleChange}
            className='py-3'
          />
        </div>

        <div className='md:col-span-2 md:row-start-2 md:flex-col items-center'>
          <label htmlFor="rut">Rut: </label>
          <Input 
            name='rut'
            onChange={formik.handleChange}
            className='py-3'
          />
        </div>

        <div className='md:col-span-2 md:col-start-3 md:row-start-2 md:flex-col items-center'>
          <label htmlFor="tipo_operario">Tipo Operario: </label>
          <Select
            showSearch
            placeholder="Selecciona una tipo de operario"
            optionFilterProp="children"
            className='rounded-md mt-1 col-span-3 h-11 w-full'
            onChange={value => formik.setFieldValue('tipo_operario', value) }
            onSearch={onSearch}
            name='tipo_operario'
            filterOption={filterOption}
            options={TIPOS_OPERARIO.map((operario) => ({
              value: operario.values,
              label: operario.label
            }))}
            />
        </div>

        <div className='md:col-span-2  md:row-start-3 md:flex-col items-center'>
          <label htmlFor="pago_x_kilo">Pago por Kilo: </label>
          <Input 
            name='pago_x_kilo'
            onChange={formik.handleChange}
            className='py-3'
          />
        </div>


        <div className='relative w-full h-12 col-span-6 '>
          <button className='absolute bottom-0 right-5 md:mt-10 md:row-start-2 bg-[#1693A7] hover:bg-[#1694a7d0] rounded-md text-white p-2'>Registrar Operario</button>
        </div>
      </form>
    </MaxWidthWrapper>
  )
}

export default FormularioRegistroOperarios
