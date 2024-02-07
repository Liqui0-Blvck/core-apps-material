import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Input } from "antd";

const { TextArea } = Input

export function ProfileInfoCard({ title, description, details, formik, editar }) {

  console.log(details)
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
      <Typography variant="h6" color="blue-gray">
        {title}
      </Typography>
        
        
      </CardHeader>
      <CardBody className="p-0">
        {description && (
          <>
            {
              editar
                ? (
                  <div>
                    <TextArea
                      type="text"
                      name='cargo'
                      placeholder="Tu descripción"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nombre}
                      className={`
                      ${formik.errors.username && formik.touched.username 
                        ? 'border-[2px] text-red-900' 
                        : 'border-[1px] border-gray-300'}
                      rounded-md px-2 mt-1 col-span-2 w-40`
                      }/>
                      {formik.touched.nombre && formik.errors.nombre && (
                        <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.nombre}</div>
                      )}
                  </div>
                  )
                : (
                  <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  )
            }
          </>
        )}
        {description && details ? (
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
        {details && (
          <ul className="flex flex-col gap-4 p-0">
            {
              editar
                ? (
                  <div className="flex flex-col items-start mb-2">
                    <div className="w-[250px] flex justify-between items-center">
                      <label htmlFor="nombre">Nombre: </label>
                      <Input  
                        type="text"
                        name='nombre'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        className={`
                        ${formik.errors.nombre && formik.touched.nombre 
                          ? 'border-[2px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.nombre && formik.errors.nombre && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.nombre}</div>
                        )}
                    </div>

                    <div className="w-[250px] flex justify-between items-center">
                      <label htmlFor="nombre">Celular: </label>
                      <Input  
                        type="text"
                        name='celular'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        className={`
                        ${formik.errors.celular && formik.touched.celular 
                          ? 'border-[2px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.celular && formik.errors.celular && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.celular}</div>
                        )}
                    </div>

                    <div className="w-[250px] flex justify-between items-center">
                      <label htmlFor="email">Email: </label>
                      <Input  
                        type="text"
                        name='email'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        className={`
                        ${formik.errors.email && formik.touched.email 
                          ? 'border-[2px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.email && formik.errors.email && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="w-[250px] flex justify-between items-center">
                      <label htmlFor="dirección">Direccion: </label>
                      <Input  
                        type="text"
                        name='dirección'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.direccion}
                        className={`
                        ${formik.errors.username && formik.touched.username 
                          ? 'border-[1px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.direccion && formik.errors.direccion && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.direccion}</div>
                        )}
                    </div>

                    <div className="w-[250px] flex justify-between items-center">
                    {/* // esto es un select */}
                      <label htmlFor="provincia">Provincia: </label>
                      <Input  
                        type="text"
                        name='provincia'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.provincia}
                        className={`
                        ${formik.errors.provincia && formik.touched.provincia 
                          ? 'border-[2px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.provincia && formik.errors.provincia && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.provincia}</div>
                        )}
                    </div>

                    <div className="w-[250px] flex justify-between items-center">
                      <label htmlFor="region">Region: </label>
                      <Input  
                        type="text"
                        name='region'
                        placeholder="Tu descripción"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.region}
                        className={`
                        ${formik.errors.region && formik.touched.region 
                          ? 'border-[2px] text-red-900' 
                          : 'border-[1px] border-gray-300'}
                        rounded-md px-2 mt-1 col-span-2 w-40`
                        }/>
                        {formik.touched.region && formik.errors.region && (
                          <div className='col-span-2 text-center text-sm text-red-900'>{formik.errors.region}</div>
                        )}
                    </div>

                    
                  </div>
                )
                : (
                  <>
                    {Object.keys(details).map((el, key) => (
                      <li key={key} className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                        >
                          {el}:
                        </Typography>
                        {typeof details[el] === "string" ? (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {details[el]}
                          </Typography>
                        ) : (
                          details[el]
                        )}
                      </li>
                    ))}
                  </>
                   
                )
            }
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
