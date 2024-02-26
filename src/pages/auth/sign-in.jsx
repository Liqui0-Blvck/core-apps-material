import AuthContext from "@/context/AuthContext";
import { LoginSchema } from "@/services/Validator";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik/dist";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function SignIn() {
  const [clicked, setClicked] = useState(false)
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })

        if (response.status === 200) {
          loginUser(response)
          toast.success('Inicio de sesión realizado con exito!')
          setTimeout(() => {
            navigate('/app/home')
          }, 1000)
        } else if (response.status === 401) {
          console.log(error)
          toast.error('Hubo un error en la creación del usuario, volver a intentar!')
        }

      } catch (error) {
        console.log(error)
        toast.error('No se puede iniciar sesion', error.message)
      }
    },
  });

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Inicia Sesión</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu nombre de registro y contraseña para ingresar</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={formik.handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu nombre
            </Typography>
            <Input
              size="lg"
              onChange={formik.handleChange}
              placeholder="name@mail.com"
              name='username'
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <Input
              onChange={formik.handleChange}
              type="password"
              size="lg"
              name='password'
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit"  >
            Ingresa
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Estas registrado?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crea una cuenta</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
