import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { RecuperarCuenta, SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};


export const Directions = {
  'Registros': (children) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name}
          path={subitem.path}
          className={open ? 'bg-blue-gray-700' : ''}
        />
      ))}
    </>
  ),
}

export const LISTA_MENU = [
  {
    name: 'Registros',
    children: [
      {
        name: 'Registro Clientes',
        path: '/app/registro-clientes'
      },
      {
        name: 'Registro Camiones',
        path: '/app/registro-camiones'
      },
      {
        name: 'Registro Choferes',
        path: '/app/registro-choferes'
      },
      {
        name: 'Registro Comercializadores',
        path: '/app/registro-comercializadores'
      },
      {
        name: 'Registro Operarios',
        path: '/app/registro-operarios'
      }
    ]  
  },
  {
    name: 'Opcion 2',
    path: ''
  }
]

export const routes = [
  {
    layout: "dashboard",
    pages: [
      // Basicos del template
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        name: "recuperar cuenta",
        path: "/recuperar-cuenta",
        element: <RecuperarCuenta />,
      },
    ],
  }
];

export default routes;
