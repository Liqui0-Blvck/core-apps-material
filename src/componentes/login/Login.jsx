import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginSchema } from '../../services/Validator';
import toast from 'react-hot-toast';


const Login = () => {
  const { loginUser, url } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(url)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values})
        })

        if (response.status === 200){
          loginUser(response)
          navigate('/home')
          toast.success('Haz ingresado sesión con exito!')
        } else if (response.status === 401) {
          toast.error('Este usuario no esta autorizado o no existe')
        }
        
      } catch (error) {
        toast.error('No se puede iniciar sesion',error.message)
      }
    },
  });

  return (
    <MaxWidthWrapper>
      <div className='mt-10 h-96 flex gap-2 flex-col'>
        <div className='w-full flex items-center justify-center'>
          <img
            src="/src/assets/logosnabbit.gif"
            alt=""
            className='ml-4 object-cover'
            height={100}
            width={200}
          />
        </div>
        <h1 className='text-xl'>Iniciar Sesion</h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 w-96 mx-auto'>
          <div className='grid grid-cols-4 place-items-center gap-2'>
            <label htmlFor='' className='w-20'>
              Nombre:{' '}
            </label>
            <input
              onChange={formik.handleChange}
              type='text'
              placeholder='Ingresa tu nombre'
              name='username'
              className={`w-full p-2 ${formik.errors.username && formik.touched.username ? 'border-[1px] border-red-600' : 'border-[1px] border-gray-400'} col-span-3 rounded-md`}
            />
          </div>
          <div className='grid grid-cols-4 place-items-center gap-2'>
            <label htmlFor='' className='w-20'>
              Contraseña:{' '}
            </label>
            <input
              onChange={formik.handleChange}
              type='password'
              placeholder='Ingresa tu contraseña'
              name='password'
              className={`w-full p-2 ${formik.errors.password && formik.touched.password ? 'border-[2px] border-red-600' : 'border-[1px] border-gray-400'} col-span-3 rounded-md`}
            />
          </div>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-500 rounded-md mt-5 hover:font-bold hover:bg-blue-400 hover:text-gray-800'
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;

