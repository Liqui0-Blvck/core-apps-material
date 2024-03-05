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
import ListaClientes from "./pages/clientes/ListaCliente";
import ListaProductores from "./pages/productores/ListaProductores";
import FormularioRegistroProductores from "./pages/productores/Formulario Registro/FormularioRegistroProductores";
import ListaGuiaRecepcion from "./pages/guia recepcion/ListaGuiaRecepcion";

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
  'Recepción MP': (children) => (
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
  )
}

export const LISTA_MENU = [
  {
    name: 'Registros',
    children: [
      {
        name: 'Clientes',
        path: '/app/lista-clientes'
      },
      {
        name: 'Productores',
        path: '/app/lista-productores'
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
    ]  
  },
  {
    name: 'Recepción MP',
    children: [
      {
        name: 'Guias Recepción',
        path: '/app/lista-guias-recepcion'
      }
    ]
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
      {
        name: 'Lista Clientes',
        path: '/lista-clientes',
        element: <ListaClientes />
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

      // REGISTROS PRODUCTORES
      {
        name: 'Registro de Productores',
        path: '/registro-productores',
        element: <FormularioRegistroProductores />
      },
      {
        name: 'Lista Productores',
        path: '/lista-productores',
        element: <ListaProductores />
      },

      // REGISTROS GUIA DE RECEPCIÓN
      {
        name: 'Registro Guia de Recepción',
        path: '/registro-guias-recepcion',
      },
      {
        name: 'Lista Guia de Recepción',
        path: '/lista-guias-recepcion',
        element: <ListaGuiaRecepcion />
      }
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
