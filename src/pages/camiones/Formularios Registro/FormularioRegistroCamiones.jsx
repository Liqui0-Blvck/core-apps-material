import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { useFormik } from 'formik'
import { Input, Switch} from 'antd'
import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'

const { TextArea } = Input

const FormularioRegistroCamiones = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  const formik = useFormik({
    initialValues: {
      patente: "",
      acoplado: false,
      observaciones: ""
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${base_url}/api/registros/camiones/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values
          })
        })
        if (res.ok) {
          toast.success("El camión fue registrado exitosamente!!")
        } else {
          toast.error("No se pudo registrar el camión volver a intentar")
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <MaxWidthWrapper>
      <form 
        onSubmit={formik.handleSubmit}
        className='flex flex-col md:grid md:grid-cols-6 gap-x-3 gap-y-5 mt-10 border border-gray-800 relative px-5 py-6'
        >
        <div className='md:col-span-2 md:flex-col items-center'>
          <label htmlFor="patente">Patente: </label>
          <Input 
            name='patente'
            onChange={formik.handleChange}
          />
        </div>

        <div className='md:col-span-2 md:col-start-3 gap-2 md:flex-col flex items-center'>
          <label htmlFor="acoplado">Acoplado: </label>
          <Switch
            name='acoplado'
            onChange={e => formik.setFieldValue('acoplado', e)}
            className='bg-blue-100'
          />
        </div>

        <div className='md:col-span-2 md:col-start-5 md:flex-col items-center'>
          <label htmlFor="observaciones">Observaciones: </label>
          <TextArea
            rows={5} 
            name='observaciones'
            onChange={formik.handleChange}
          />
        </div>



        <div className='relative w-full h-20 col-span-6 bg-blue-gray-100'>
          <button className='absolute right-0 border border-gray-800 md:mt-10 md:row-start-2 bg-[#1693A7] hover:bg-[#1694a7d0] rounded-md text-white p-2'>Registrar Camion</button>
        </div>
      </form>
    </MaxWidthWrapper>
  )
}

export default FormularioRegistroCamiones
