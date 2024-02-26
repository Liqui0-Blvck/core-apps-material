import { useAuth } from '@/context/AuthContext'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { Select } from 'antd'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

const FormularioItemContenedor = ({ id, refresh, close }) => {
  const { authTokens, validToken } = useAuth()
  const base_url = import.meta.env.VITE_BASE_URL
  const { data: items } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/items/`
  )

  const { data: contenedor, setRefresh } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/contenedor/${id}`
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
        const response = await fetch(`${base_url}/api/items_contenedor/` ,{
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
          formik.setValues(formik.initialValues)
          refresh(true)
          setRefresh(true)
          close(false)
        } else {
          console.log("No se ha logrado agregar el item, ¡Vuelve a intentarlo!")
        }
      } catch (error) {
        
      }
    }
  })
  
  const options = items && items
    .filter(item => !contenedor.items.some(contenedorItem => contenedorItem.id === item.id))
    .map(item => ({
      value: item.id,
      label: item.nombre
    }))

  return (
    <div className='w-full flex gap-10 '>
      <form className='w-full flex flex-col gap-20 items-center' onSubmit={formik.handleSubmit}>
        <Select
          showSearch
          placeholder="Selecciona un item"
          optionFilterProp="children"
          className='rounded-md mt-1 col-span-3 h-11 w-full'
          onChange={e => formik.setFieldValue('item', e)}
          onSearch={onSearch}
          name='item'
          filterOption={filterOption}
          options={options}
          />

        <button type='submit' className='bg-blue-400 hover:bg-blue-300 rounded-md px-6 py-2'>
          <p className='font-semibold text-white text-md'>Agregar Item</p>
        </button>
      </form>
    </div>
  )
}

export default FormularioItemContenedor
