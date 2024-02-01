import React from 'react'

const SucursalFormulario = ({ formik, region, comuna, provincia, setRegionID, setProvinciaID }) => {
  

  const handleRegion = ({ target }) => {
    const { value } = target
    setRegionID(value)
  }
  return (
    <form className='grid grid-rows-3 items-center w-full h-96' onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-5'>
        <div className='grid grid-cols-2 col-span-2 items-center'>
          <label htmlFor='numero' className='text-start'>Número: </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.numero}
            name='numero'
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'/>
        </div>

        <div className='grid grid-cols-2 col-span-2 col-start-4 items-center'>
          <label htmlFor="region">Region: </label>
            <select
            name="region"
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-3'
            // eslint-disable-next-line no-unused-expressions
            onChange={(e) => { formik.handleChange(e); handleRegion(e) }}>
            <option value="">Seleccione una categoria</option>
            {
              region && region.map((region) => (
                <option key={region.region_id} value={region.region_id}>{region.region_nombre}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className='grid grid-cols-5'>
        

        <div className='grid grid-cols-2  col-span-2 items-center'>
          <label htmlFor="provincia">Provincia: </label>
            <select
            name="provincia"
            className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
            // eslint-disable-next-line no-unused-expressions
            onChange={(e) => { formik.handleChange(e); setProvinciaID(e.target.value) }}>
            <option value="">Seleccione una categoria</option>
            {
              provincia && provincia.map((provincia) => (
                <option key={provincia.provincia_id} value={provincia.provincia_id}>{provincia.provincia_nombre}</option>
              ))
            }
          </select>
        </div>

        <div className='grid grid-cols-2 col-start-4 col-span-2 items-center'>
          <label htmlFor="comuna">Comuna: </label>
          <select
          name="comuna"
          className='border-[1px] border-gray-300 rounded-md p-2 mt-1 col-span-2'
          // eslint-disable-next-line no-unused-expressions
          onChange={(e) => formik.handleChange(e)}>
          <option value="">Seleccione una categoria</option>
          {
            comuna && comuna.map((comuna) => (
              <option key={comuna.comuna_id} value={comuna.comuna_id}>{comuna.comuna_nombre}</option>
            ))
          }
        </select>
        </div>
      </div>

      <button type='submit' className='p-2 bg-blue-200 rounded-md mt-5 w-full'>Agregar</button>

    </form>
  )
}

export default SucursalFormulario
