import React from 'react'
import { Select } from 'antd';
import { useFormik } from 'formik';
import { useClient } from '@/context/ClientContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';


const FormularioUsuarioEquipo = ({ modalClose, id, refresh }) => {
  const { authTokens, user, validToken } = useAuth()
  const { clientInfo } = useClient()
  const { data: usuarios } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/usuarios/?search=${clientInfo.id}`
  )

  const { data: equipos, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/equipo/${id}/?search=${clientInfo.id}`
  )

  const formik = useFormik({
    initialValues: {
      activo: false,
      usuario: null,
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/equipo-usuarios/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({
            ...values,
            equipo: id
          })
        })

        if (response.ok){
          toast.success('Equipo registrado correctamente!')
          refresh(true)
          modalClose(false)
        } else {
          toast.error('No se pudo registrar el equipo, vuelva a intentarlo!')
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

  const options = usuarios && usuarios
    .filter(usuario => equipos && !equipos.usuarios.some(usuarioE => usuarioE.usuario === usuario.id))
    .map(usuario => ({
      value: usuario.id,
      label: usuario.nombre
    }))


  return (
    <form className='grid grid-cols-4 items-center place-items-center gap-2 w-full h-full my-10' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div 
        className='grid grid-cols-2 h-full'>
        <label htmlFor='marca' className='text-start'>Activo:</label>
        <Checkbox name='activo' className='row-start-2' onChange={e => formik.handleChange(e)}/>
      </div>
      
      <div className='w-full grid grid-cols-2 items-center col-start-2 col-span-3 h-full'>
        <label htmlFor='procesador' className='text-center w-20'>Procesador: </label>
        <Select
          showSearch
          placeholder="Selecciona un procesador"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={e => formik.setFieldValue('usuario', e)}
          onSearch={onSearch}
          name='procesador'
          filterOption={filterOption}
          options={options}
        />
      </div>
      
      <button type='submit' className='row-start-2 col-span-4 p-2 bg-blue-400 hover:bg-blue-300 text-white rounded-md mt-5 w-full'>Agregar</button>
    </form>
  )
}

export default FormularioUsuarioEquipo
