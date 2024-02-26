import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";



export function SignUp() {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password2: "",
      email: ""
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/registro/', {
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
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Registrate</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu correo y contraseña para registrarte.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={formik.handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu nombre
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
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
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

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>

            <Input
              size="lg"
              type="password"
              name="password"
              onChange={formik.handleChange}
              placeholder="*********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirma tu contraseña
            </Typography>
            <Input
              size="lg"
              type="password"
              name="password2"
              onChange={formik.handleChange}
              placeholder="*********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {
              formik.values.password2 !== ''
                ? (
                  <div className={formik.values.password === formik.values.password2 ? ' text-green-600' : 'text-red-800'}>
                    {formik.values.password === formik.values.password2 ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                  </div>
                )
                : null
            }

          </div>

          <Button className="mt-6" fullWidth type="submit">
            Registrate
          </Button>


          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Tienes una cuenta?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Ingresa a tu cuenta</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
