import * as Yup from 'yup'

export const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(8, 'Muy corto el texto!')
    .max(20, 'Muy largo el texto!')
    .required('Required'),
  descripcion: Yup.string()
    .max(60, 'Muy largo')
});


export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, 'Muy corto el texto')
    .max(15, 'Muy largo el texto')
    .required('Required'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial')
})


export const ComponenteSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  descripcion: Yup.string()
    .min(8, 'Muy corta descripción!')
    .max(100, 'Descripción muy larga!'),
  categoria: Yup.string().required('La categoría es obligatoria'),
})