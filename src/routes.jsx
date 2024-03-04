import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { RecuperarCuenta, SignIn, SignUp } from "@/pages/auth";
import FormularioRegistroCamiones from "./pages/camiones/Formularios Registro/FormularioRegistroCamiones";
import ListaCamiones from "./pages/camiones/ListaCamiones";
import ListaChoferes from "./pages/choferes/ListaChoferes";
import FormularioRegistroChoferes from "./pages/choferes/Formularios Registro/FormularioRegistroChoferes";
import FormularioRegistroOperarios from "./pages/operarios/FormulariosRegistro/Formularios Registro/FormularioRegistroChoferes";
import ListaOperarios from "./pages/operarios/ListaOperarios";

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
  'Listas': (children) => (
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
        name: 'Registro Conductor',
        path: '/app/registro-conductor'
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
    name: 'Listas',
    children: [
      {
        name: 'Clientes',
        path: '/app/lista-clientes'
      },
      {
        name: 'Camiones',
        path: '/app/lista-camiones'
      },
      {
        name: 'Conductores',
        path: '/app/lista-conductores'
      },
      {
        name: 'Comercializadores',
        path: '/app/lista-comercializadores'
      },
      {
        name: 'Operarios',
        path: '/app/lista-operarios'
      }
    ],

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

      // REGISTRO CLIENTES
      {
        name: 'Registro Clientes',
        path: '/registro-clientes',
        // element: <FormularioRegistroClientes />
      },

      // REGISTRO CAMIONES
      {
        name: 'Registro Camiones',
        path: '/registro-camiones',
        element: <FormularioRegistroCamiones />
      },
      {
        name: 'Lista Camiones',
        path: '/lista-camiones',
        element: <ListaCamiones />
      },

      // REGISTRO CHOFERES
      {
        name: 'Registro Conductor',
        path: '/registro-conductor',
        element: <FormularioRegistroChoferes />
      },
      {
        name: 'Lista Conductores',
        path: '/lista-conductores',
        element: <ListaChoferes />
      },

      // REGISTROS OPERARIOS
      {
        name: 'Registro Operario',
        path: '/registro-operarios',
        element: <FormularioRegistroOperarios />
      },
      {
        name: 'Lista Operarios',
        path: '/lista-operarios',
        element: <ListaOperarios />
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
