/* eslint-disable react/prop-types */
import { useAuth } from '@/context/AuthContext'


const HeaderFormularioRegistro = ({ formik }) => {
  return (
    <section className='mb-5 overflow-hidden px-5 py-3'>
      <form className='w-full full flex xl:flex-row xl:justify-between lg:flex-row lg:justify-between gap-20 md:flex-row flex-col'>

        {/* // Part de la izquierda del documento */}
        <div className='bg-gray-100 w-full lg:w-[80%] grid grid-rows-8 gap-2'>
          <div className='row-span-1 w-48'>
            <img src="/img/logosnabbit.gif" alt="" className='w-full h-full object-contain' />
          </div>

          <div className='row-start-4  w-full md:w-[90%] flex gap-3 md:gap-6 justify-between items-center'>
            <label htmlFor="encargado" className='text-start w-20'>Encargado: </label>
            <input
              type="text"
              name='encargado'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-8/12 md:w-full w-8/12'
              onChange={formik.handleChange} />
          </div>

          <div className='row-start-6 w-full md:w-[90%] flex gap-3 md:gap-6 justify-between items-center'>
            <label htmlFor="destinatario" className='text-start w-20'>Destinatario: </label>
            <input
              type="text"
              name='destinatario'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-8/12 md:w-full w-8/12'
              onChange={formik.handleChange} />
          </div>
        </div>

        {/* // Parte derecha del documento */}

        <div className='bg-gray-100 w-full lg:w-[90%] grid lg:grid-rows-8 md:grid-rows-8  gap-2  lg:mt-12 md:mt-12'>
          <div className='row-start-5 w-full md:w-[90%] flex gap-3 md:gap-6 justify-between items-center'>
            <label htmlFor="direccion" className='text-start md:pr-1 w-20'>Dirección: </label>
            <input
              type="text"
              name='direccion'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-8/12 md:w-full w-8/12'
              onChange={formik.handleChange} />
          </div>

          <div className='row-start-6 w-full md:w-[90%] flex gap-3 md:gap-6 justify-between items-center'>
            <label htmlFor="nombre_receptor" className='text-start w-20'>Nombre Receptor: </label>
            <input
              type="text"
              name='nombre_receptor'
              className='px-2.5 h-10 border-[1px] border-gray-300 rounded-md lg:w-8/12 md:w-full w-8/12'
              onChange={formik.handleChange} />
          </div>
        </div>
      </form>
    </section>
  )
}

export default HeaderFormularioRegistro
