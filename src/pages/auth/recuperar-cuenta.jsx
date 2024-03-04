import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";



export function RecuperarCuenta() {
  const base_url = import.meta.env.VITE_BASE_URL

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: ""
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${base_url}/auth/registro/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })


        if (response.ok) {
          toast.success('Se ha registrado correctamente!')
          navigate('/auth/sign-in')
        } else {
          toast.error('No se ha registrado, vuelva a intentarlo')
          console.log(response.status)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })



  return (
    <section className="m-5 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-4/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Recupera tu cuenta</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu nombre y correo para recuperar tu cuenta.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={formik.handleSubmit}>
          <div className="mb-2 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
              Tu nombre de usuario
            </Typography>
            <Input
              size="lg"

              name="username"
              onChange={formik.handleChange}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6 mt-4 ">
            <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
              Correo
            </Typography>
            <Input
              size="lg"
              name="email"
              onChange={formik.handleChange}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Enviar 
          </Button>
        </form>

      </div>
    </section>
  );
}

export default RecuperarCuenta;
