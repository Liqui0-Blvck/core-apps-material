import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import MaxWidthWrapper from '@/componentes/MaxWidthWrapper';
import { ComponenteSchema } from '@/services/Validator';
import toast from 'react-hot-toast';
import { Select } from 'antd';


const FormularioAsignarTecnico = ({ id, modalClose, refresh }) => {
  const { authTokens, validToken } = useAuth()
  const { data: tecnicos, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    'http://127.0.0.1:8000/auth/tecnico/'
    )


  const formik = useFormik({
    initialValues: {
      tecnico: null
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://localhost:8000/api/tecnico-ticket-update/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          toast.success('Item añadido correctamente!')
          modalClose(false)
          refresh(true)
        } else {
          toast.error('Error al añadir el item');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    },
  });
  

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
      <form className='flex flex-col items-center gap-8 w-full h-full my-5' onSubmit={formik.handleSubmit}>
        <div className='w-full grid grid-cols-2 row-start-2 col-span-2 col-start-3 items-center'>
          <label htmlFor="tecnico">Tecnico: </label>
          <Select
            showSearch
            placeholder="Selecciona una tecnicos"
            optionFilterProp="children"
            className='rounded-md mt-1 col-span-3 h-11 w-full'
            onChange={value => formik.setFieldValue('tecnico', value) }
            onSearch={onSearch}
            name='tecnico'
            filterOption={filterOption}
            options={tecnicos && tecnicos.map(tec => ({
              value: tec.id,
              label: tec.username
            }))}
          />
        </div>

        <button type='submit' className='row-start-3 col-start-5 col-span-2  p-2 bg-blue-600 hover:bg-blue-500 rounded-md w-full'>
          <p className='text-white font-smibold'>Asignar Técnico</p>
        </button>
      </form>
    </MaxWidthWrapper>
  )
}

export default FormularioAsignarTecnico
