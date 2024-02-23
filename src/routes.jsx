import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { Clientes } from '@/pages/clientes'
import { SignIn, SignUp } from "@/pages/auth";
import ItemDetail from "./componentes/Item/Detalle Item/ItemDetail";

const icon = {
  className: "w-5 h-5 text-inherit",
};

import Contenedor from "./componentes/contenedor/Contenedor";
import ContenedorDetail from "./componentes/contenedor/Detalle Contenedor/ContenedorDetail";
import ItemList from "./componentes/Item/ItemList";
import Categoria from "./componentes/categoria/Categoria";
import Proveedor from "./componentes/proveedor/Proveedor";
import OrdenDeCompra from "./componentes/orden_de_compra/OrdenDeCompra";
import OrdenCompraForm from "./componentes/orden_de_compra/Formulario/FormularioOrdenCompra";
import ProveedorDetail from "./componentes/proveedor/Detalle Proveedor/ProveedorDetail";
import FormularioItemEdicion from "./componentes/Item/Formularios/FormularioItemEdicion";
import FormularioContenedorEdicion from "./componentes/contenedor/Formulario/FormularioContenedorEdicion";
import FormularioEditableProveedor from "./componentes/proveedor/Edicion/FormularioEditableProveedor";
import SucursalCard from "./componentes/sucursal/Detalle Sucursal/SucursalCard";
import Usuarios from "./componentes/usuarios/Usuarios";
import Equipos from "./componentes/equipos/Equipos";
import Tickets from "./componentes/tickets/Tickets";
import FormularioRegistroUsuario from "./componentes/usuarios/Formularios/FormularioRegistroUsuario";
import HomeClient from "./pages/dashboard/homeClient";
import FormularioRegistroEquipo from "./componentes/equipos/Formularios/FormularioRegistroEquipo";
import DetalleUsuario from "./componentes/usuarios/Detalle Usuario/DetalleUsuario";
import FormularioEditableEquipo from "./componentes/equipos/Formularios/FormularioEditableEquipo";
import DetalleEquipo from "./componentes/equipos/Detalle Equipo/DetalleEquipo";
import FormularioRegistroItem from "./componentes/Item/Formularios/FormularioRegistroItem";
import FormularioRegistroContenedor from "./componentes/contenedor/Formulario/FormularioRegistroContenedor";
import FormularioRegistroProveedor from "./componentes/proveedor/Formularios/FormularioRegistroProveedor";
import Invento from "./componentes/invento/Invento";
import FormularioRegistroInvento from "./componentes/invento/Formularios/FormularioRegistroInvento";
import FormularioEditableInvento from "./componentes/invento/Formularios/FormularioEditableInvento";
import InventoDetalle from "./componentes/invento/Detalle Invento/InventoDetalle";
import GuiaDeSalida from "./componentes/guia_de_salida/GuiaDeSalida";
import FormularioGuiaSalida from "./componentes/guia_de_salida/Formulario/FormularioGuiaSalida";
import FormularioEditableGuiaSalida from "./componentes/guia_de_salida/Formulario Editable/FormularioEditableGuiaSalida";
import DetalleGuiaSalida from "./componentes/guia_de_salida/Detalle Guia/DetalleGuiaSalida";
import DetalleOrdenDeCompra from "./componentes/orden_de_compra/Detalle Orden/DetalleOrdenDeCompra";
import FormularioOrdenDeCompra from "./componentes/orden_de_compra/Formulario/FormularioOrdenCompra";
import FormularioEdtiableOrdenDeCompra from "./componentes/orden_de_compra/Formulario Editable/FormularioEditableOrdenDeCompra";
import FormularioEditableOrdenDeCompra from "./componentes/orden_de_compra/Formulario Editable/FormularioEditableOrdenDeCompra";
import FormularioRegistroClientes from "./pages/clientes/Formulario Registro/FormularioRegistroCliente";

export const AccordionSubItem = ({ name, path }) => {
  return (
    <Link to={path} key={path} className='w-full p-0 ml-2'>
      <ListItemButton>
        <ListItemText>
          {name}
        </ListItemText>
      </ListItemButton>
    </Link>
  )
}






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
  'Bodega': (children) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name}
          path={subitem.path}

        />
      ))}
    </>
  ),
  'Orden de compra': (children) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name}
          path={subitem.path}
        />
      ))}
    </>
  ),
  'Guia de Salida': (children) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name}
          path={subitem.path}
        />
      ))}
    </>
  ),
  'Información': (children) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name}
          path={subitem.path}
        />
      ))}
    </>
  ),
};

export const LISTA_MENU_GESTION = [
  {
    name: 'Clientes',
    path: '/app/clientes',
  },
  {
    name: 'Registro Clientes',
    path: '/app/registro-clientes'
  },
]

export const LISTA_MENU_CLIENTE = [
  {
    name: 'Registros',
    path: '',
    children: [
      {
        name: 'Registro Usuarios',
        path: '/app/registro-usuario'
      },
      {
        name: 'Registro Equipo',
        path: '/app/registro-equipo'
      }
    ]
  },
  {
    name: 'Información',
    path: '',
    children: [
      {
        name: 'Usuarios',
        path: '/app/usuarios'
      },
      {
        name: 'Equipos',
        path: '/app/equipos'
      },
      {
        name: 'Tickets',
        path: '/app/tickets'
      }
    ]

  }
]

export const LISTA_MENU_BODEGA = [
  {
    name: 'Registros',
    path: '',
    children: [
      {
        name: 'Registrar Item',
        path: '/app/registro-item'
      },
      {
        name: 'Registrar Proveedor',
        path: '/app/registro-proveedor'
      },
      {
        name: 'Registrar Invento',
        path: '/app/registro-invento'
      },
    ]
  },
  {
    name: 'Bodega',
    path: '',
    children: [
      {
        name: 'Item',
        path: '/app/item'
      },
      {
        name: 'Invento',
        path: '/app/inventos'
      },
      {
        name: 'Contenedores',
        path: '/app/contenedores'
      },
      {
        name: 'Categorias',
        path: '/app/categorias'
      },
      {
        name: 'Proveedores',
        path: '/app/proveedores'
      },
      {
        name: 'Crear Contenedor',
        path: '/app/registro-contenedor'
      }
    ]
  },
  {
    name: 'Orden de compra',
    path: '',
    children: [
      {
        name: 'Ordenes de compra',
        path: '/app/orden-compra'
      },
      {
        name: 'Crear Orden de compra',
        path: '/app/registro-orden-compra'
      }
    ]
  },
  {
    name: 'Guia de Salida',
    path: '',
    children: [
      {
        name: 'Guia de Salida',
        path: '/app/guia-salida'
      },
      {
        name: 'Crear Guia de Salida',
        path: '/app/registro-guia-salida'
      }
    ]
  },
  {
    name: 'Inventario',
    path: '',
    children: [
      {
        name: 'Inventarios',
        path: '/app/inventarios'
      },
      {
        name: 'Crear Inventario',
        path: '/app/registro-inventario'
      }
    ]
  }
]

export const LISTA_MENU = [
  {
    name: 'Dashboard',
    path: '/app/home',
  },
  {
    name: 'Bodega Snabbit',
    path: ''
  },
  {
    name: 'Gestion Clientes',
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
        icon: <HomeIcon {...icon} />,
        name: "dashboard clientes",
        path: "/home-clientes",
        element: <HomeClient />,
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
      // OBJETOS ITEM
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "item registro",
        path: "/registro-item",
        element: <FormularioRegistroItem />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "item",
        path: "/item",
        element: <ItemList />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "item",
        path: "/edicion-item/:id",
        element: <FormularioItemEdicion />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "item",
        path: "/item/:id",
        element: <ItemDetail />,
      },
      // OBJECTOS DE INVENTOS
      {
        name: 'invento',
        path: '/inventos',
        element: <Invento />
      },
      {
        name: 'invento',
        path: '/invento/:id',
        element: <InventoDetalle />
      },
      {
        name: 'invento',
        path: '/registro-invento',
        element: <FormularioRegistroInvento />
      },
      {
        name: 'invento',
        path: '/edicion-invento/:id',
        element: <FormularioEditableInvento />
      },
      // OBJETOS DEL CONTENEDOR
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "contenedor",
        path: "/contenedores",
        element: <Contenedor />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "contenedor",
        path: "/registro-contenedor",
        element: <FormularioRegistroContenedor />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edicion contenedor",
        path: "/edicion-contenedor/:id",
        element: <FormularioContenedorEdicion />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "contenedor",
        path: "/contenedor/:id",
        element: <ContenedorDetail />,
      },
      // OBJETOS DE CATEGORIAS
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "categoria",
        path: "/categorias",
        element: <Categoria />,
      },
      // OBJETOS DE PROVEEDORES
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Proveedores",
        path: "/proveedores",
        element: <Proveedor />,
      },
      {
        name: 'Detalle Proveedor',
        path: '/proveedor/:id',
        element: <ProveedorDetail />
      },
      {
        name: 'Edición Proveedor',
        path: '/edicion-proveedor/:id',
        element: <FormularioEditableProveedor />
      },
      {
        name: 'Registro Proveedor',
        path: '/registro-proveedor',
        element: <FormularioRegistroProveedor />
      },
      // RUTAS DE LA GUIA DE SALIDA
      {
        name: 'Guias de Salida',
        path: '/guia-salida',
        element: <GuiaDeSalida />
      },
      {
        name: 'Detalle Guia Salida',
        path: '/guia-salida/:id',
        element: <DetalleGuiaSalida />
      },
      {
        name: 'Registro Guia Salida',
        path: '/registro-guia-salida',
        element: <FormularioGuiaSalida />
      },
      {
        name: 'Registro Guia Salida',
        path: '/edicion-guia-salida/:id',
        element: <FormularioEditableGuiaSalida />
      },
      
      // OBJETOS ORDEN DE COMPRA  
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Ordenes de Compra",
        path: "/orden-compra",
        element: <OrdenDeCompra />,
      },
      {
        name: 'Crear Orden de Compra',
        path: '/registro-orden-compra',
        element: <FormularioOrdenDeCompra />
      },
      {
        name: 'Editar Orden de Compra',
        path: '/edicion-orden-compra/:id',
        element: <FormularioEditableOrdenDeCompra />
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Detalle Orden de Compra",
        path: "/orden-compra/:id",
        element: <DetalleOrdenDeCompra />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Sucursal Detalle",
        path: "/sucursal/:id",
        element: <SucursalCard />,
      },
      // RUTAS CLIENTES
      {
        name: 'Clientes',
        path: '/clientes',
        element: <Clientes />
      },
      {
        name: 'Clientes',
        path: '/registro-clientes',
        element: <FormularioRegistroClientes />
      },
      {
        name: 'Registro Usuarios',
        path: '/registro-usuario',
        element: <FormularioRegistroUsuario />
      },
      {
        name: 'Registro Equipo',
        path: '/registro-equipo',
        element: <FormularioRegistroEquipo />
      },
      {
        name: 'Usuarios',
        path: '/usuarios',
        element: <Usuarios />
      },
      {
        name: 'Detalle Usuarios',
        path: '/usuario/:id',
        element: <DetalleUsuario />
      },
      {
        name: 'Equipos',
        path: '/equipos',
        element: <Equipos />
      },
      {
        name: 'Editar Equipo',
        path: '/edicion-equipo/:id',
        element: <FormularioEditableEquipo />
      },
      {
        name: 'Editar Equipo',
        path: '/equipo/:id',
        element: <DetalleEquipo />
      },
      {
        name: 'Tickets',
        path: '/tickets',
        element: <Tickets />
      },
      {
        name: 'Clientes',
        path: '/clientes',
        element: <Clientes />
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
