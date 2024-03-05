import MaxWidthWrapper from '@/componentes/MaxWidthWrapper'
import { useFormik } from 'formik'
import React from 'react'

const FormularioRegistroClientes = () => {
  const formik = useFormik({
    initialValues: {

    },
    onSubmit: async (values) => {
      
    }
  })

  return (
    <MaxWidthWrapper>
      <form onSubmit={formik.handleSubmit}>

        
        

        <button>
          Registrar Cliente
        </button>
      </form>
    </MaxWidthWrapper>
  )
}

export default FormularioRegistroClientes
