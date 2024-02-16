import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { useFormik } from "formik";
import { compresor } from "@/services/compresor_imagen";
import { Input } from "antd";

export function Profile() {
  const {authTokens, validToken, user} = useContext(AuthContext)
  const [editar, setEditar] = useState(false)
  const navigate = useNavigate()

  const { data: usuario, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/perfil/${user.user_id}`
  )

  const { data: region } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/regiones`
  )

  console.log(editar)

  const handleClick = () => {
    setEditar(prev => !prev)
  }

  const formik = useFormik({
    initialValues: {
      provincia: 0,
      region: 0,
      comuna: 0,
      provincia_nombre: null,
      region_nombre: null,
      comuna_nombre: null,
      sobre_mi: "",
      direccion: "",
      cargo: "",
      foto: ""
    },
    onSubmit: async (value) => {

    }
  })

  const [usuarioForm, setUsuarioForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: ""
  })

  const handleChangeUsuario = ({ target }) => {
    const { name, value } = target

    setUsuarioForm({
      ...usuarioForm,
      [name]: value
    })
  }
  console.log(formik.values)
  console.log(usuarioForm)

  return (
    <>
      <form>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                {
                  editar
                    ? (
                      <div 
                        className='row-span-2 col-span-2 border-[2px] h-[72px] w-[73px] border-blue-400 rounded-md p-2 mt-1  flex items-center justify-center cursor-pointer relative z-10'
                        onClick={() => document.getElementById('input-field').click()}>
                          <input
                          type='file'
                          name='foto'
                          accept='image/*'
                          onChange={async (e) => {
                            
                            if (e.currentTarget.files){
                              const compresor_result = await compresor(e.currentTarget.files[0], 0.6)
                              if (compresor_result){
                                const file = new File([compresor_result], e.target.files[0].name, { type: 'image/webp'})
                                formik.setFieldValue('foto', file)
                              }
                            }
                        }}
                        className='hidden'
                        id='input-field'/>

                        <p className="text-center">Agrega Foto</p>
                      </div>
                      )
                    : (
                      <Avatar
                        src={usuario ? usuario && usuario.foto : '/img/default-profile.jpg'}
                        alt="bruce-mars"
                        size="xl"
                        variant="rounded"
                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                      />
                    )
                }
                <div>
                  {
                    editar
                      ? (
                        <div>
                          <Input
                            type="text"
                            name='username'
                            placeholder="nombre usuario"
                            onChange={handleChangeUsuario}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                            className={`
                            ${formik.errors.username && formik.touched.username 
                              ? 'border-[2px] text-red-900' 
                              : 'border-[1px] border-gray-300'}
                            rounded-md px-2 mt-1 col-span-2`
                            }/>
                            {formik.touched.nombre && formik.errors.nombre && (
                              <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.nombre}</div>
                            )}
                        </div>
                        )
                      : (
                        <Typography variant="h5" color="blue-gray" className="mb-1">
                          {usuario && usuario.usuario.username}
                        </Typography>
                      )
                  }

                  {
                    editar
                      ? (
                        <div>
                          <Input
                            type="text" 
                            name='cargo'
                            placeholder="Cargo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                            className={`
                            ${formik.errors.username && formik.touched.username 
                              ? 'border-[2px] text-red-900' 
                              : 'border-[1px] border-gray-300'}
                            rounded-md px-2 mt-1 col-span-2`
                            }/>
                            {formik.touched.nombre && formik.errors.nombre && (
                              <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.nombre}</div>
                            )}
                        </div>
                        )
                      : (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          {usuario ? usuario && usuario.cargo : 'Asigna tu cargo'}
                        </Typography>
                      )
                  }
                  
                  
                </div>
              </div>
              <div className="w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="app">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      App
                    </Tab>
                    <Tab value="message">
                      <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Message
                    </Tab>
                    <Tab value="settings">
                      <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Settings
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              {/* <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>
                <div className="flex flex-col gap-12">
                  {platformSettingsData.map(({ title, options }) => (
                    <div key={title}>
                      <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                        {title}
                      </Typography>
                      <div className="flex flex-col gap-6">
                        {options.map(({ checked, label }) => (
                          <Switch
                            key={label}
                            id={label}
                            label={label}
                            defaultChecked={checked}
                            labelProps={{
                              className: "text-sm font-normal text-blue-gray-500",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              <ProfileInfoCard
                title="Información Perfil"
                description={usuario ? 'Agrega algun comentario sobre ti' : usuario && usuario.sobre_mi}
                editar={editar}
                formik={formik}
                details={{
                  nombre: `${usuario === null ? (usuario && usuario.usuario.first_name, '  ', usuario && usuario.usuario.last_name) : 'Agrega tu nombre' }`,
                  celular: `${usuario === null ? usuario && usuario.contacto : 'Agrega tu número de celular'}`,
                  email: `${usuario === null ? usuario && usuario.usuario.email : 'Agrega tu correo'}`,
                  direccion: `${usuario  === null ? usuario && usuario.direccion : 'Agrega una direccion'}`,
                  provincia: `${usuario === null ? usuario && usuario.provincia_nombre : 'Agrega una provincia'}`,
                  region: `${usuario === null ? usuario && usuario.region_nombre : 'Agrega una región'}`,
                  // social: (
                  //   <div className="flex items-center gap-4">
                  //     <i className="fa-brands fa-facebook text-blue-700" />
                  //     <i className="fa-brands fa-twitter text-blue-400" />
                  //     <i className="fa-brands fa-instagram text-purple-500" />
                  //   </div>
                  // ),
                }}
              />
              <Tooltip content="Edit Profile" >
                <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" onClick={() => handleClick()}/>
              </Tooltip>
              {/* <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>
                <ul className="flex flex-col gap-6">
                  {conversationsData.map((props) => (
                    <MessageCard
                      key={props.name}
                      {...props}
                      action={
                        <Button variant="text" size="sm">
                          reply
                        </Button>
                      }
                    />
                  ))}
                </ul>
              </div> */}
            </div>
            {/* <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Architects design houses
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                {projectsData.map(
                  ({ img, title, description, tag, route, members }) => (
                    <Card key={title} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        <img
                          src={img}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {tag}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Link to={route}>
                          <Button variant="outlined" size="sm">
                            view project
                          </Button>
                        </Link>
                        <div>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div> */}
          </CardBody>
        </Card>
      </form>
    </>
  );
}

export default Profile;
