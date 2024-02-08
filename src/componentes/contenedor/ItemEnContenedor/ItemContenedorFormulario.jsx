import AuthContext from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { Select } from 'antd'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

const ItemContenedorFormulario = ({ id, refresh, close }) => {
  const { authTokens, validToken } = useContext(AuthContext)
  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/item/`
  )

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (
    input,
    option,
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  

  const formik = useFormik({
    initialValues: {
      item: null
    },
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/items_contenedor/` ,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values,
            contenedor: id,
          })
        })

        if (response.ok){
          toast.success("Item agregado correctamente al contenedor")
          refresh(true)
          close(false)
          
        } else {
          console.log("Algo malo ocurrio")
        }
      } catch (error) {
        
      }
    }
  })

  console.log(formik.values)

  console.log(items)
  return (
    <div className='w-full flex gap-10 '>
      <form className='w-full border border-gray-400 flex flex-col items-center' onSubmit={formik.handleSubmit}>
        <Select
          showSearch
          placeholder="Selecciona un estado"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={e => formik.setFieldValue('item', e)}
          onSearch={onSearch}
          name='item'
          filterOption={filterOption}
          options={items && items.map((item) => ({
            value: item.id,
            label: item.nombre
          }))}
          />

        <button type='submit' className='bg-blue-500 px-4 py-2'>Agregar Item</button>
      </form>
    </div>
  )
}

export default ItemContenedorFormulario
