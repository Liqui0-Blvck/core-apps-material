import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import ItemForm from "./componentes/Item/ItemForm";
import ItemDetail from "./componentes/Item/ItemDetail";

const icon = {
  className: "w-5 h-5 text-inherit",
};


import { ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import Contenedor from "./componentes/contenedor/Contenedor";
import ContenedorDetail from "./componentes/contenedor/ContenedorDetail";
import TablaProveedor from "./componentes/proveedor/TablaProveedor";
import ContenedorForm from "./componentes/contenedor/ContenedorForm";
import CategoriaForm from "./componentes/categoria/CategoriaForm";
import TablaCategorias from "./componentes/categoria/TablaCategorias";
import ProveedorForm from "./componentes/proveedor/ProveedorForm";
import TablaOrdenDeCompra from "./componentes/orden_de_compra/TablaOrdenDeCompra";
// import OrdenCompraForm from "./componentes/orden_de_compra/OrdenCompraForm";
import ItemList from "./componentes/Item/ItemList";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Categoria from "./componentes/categoria/Categoria";
import Proveedor from "./componentes/proveedor/Proveedor";
import OrdenDeCompra from "./componentes/orden_de_compra/OrdenDeCompra";
import OrdenCompraForm from "./componentes/orden_de_compra/Formulario/OrdenDeCompraForm";
// import { Outlet } from "./componentes/Item/ItemList";

export const AccordionSubItem = ({ name, path, anchor, toggleDrawer }) => {
  return (
    <Link to={path} key={path} className='w-full p-0 ml-2'>
      <ListItemButton onClick={toggleDrawer(anchor, false)}>
        <ListItemText>
          {name}
        </ListItemText>
      </ListItemButton>
   </Link>
  )
}






export const Directions = {
  'Registros': (children, toggleDrawer, anchor) => (
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
  'Bodega': (children, toggleDrawer, anchor) => (
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
  'Orden de compra': (children, toggleDrawer, anchor) => (
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
  'Directions': (children, toggleDrawer, anchor) => (
    <>
      {/* Lógica específica para 'Directions' */}
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



export const LISTA_MENU = [
  {
    name: 'Dashboard',
    path: '/home',
  },
  {
    name: 'Registros',
    path: '',
    children: [
      {
        name: 'Registrar Item',
        path: '/item-registro'
      },
      {
        name: 'Registrar Categoria',
        path: '/categoria-registro'
      },

      {
        name: 'Registrar Proveedor',
        path: '/proveedor-registro'
      }
    ]
  },
  {
    name: 'Bodega',
    path: '',
    children: [
      {
        name: 'Item',
        path: '/item'
      },
      {
        name: 'Contenedores',
        path: '/contenedores'
      },
      {
        name: 'Categorias',
        path: '/categorias'
      },
      
      {
        name: 'Proveedores',
        path: '/proveedores'
      },
      {
        name: 'Crear Contenedor',
        path: '/contenedor-registro'
      }
    ]
  },
  {
    name: 'Orden de compra',
    path: '',
    children: [
      {
        name: 'Ordenes de compra',
        path: '/orden-de-compra'
      },
      {
        name: 'Crear Orden de compra',
        path: '/orden-registro'
      }
    ]
  },
  {
    name: 'Inventario',
    path: '',
    children: [
      {
        name: 'Inventarios',
        path: '/orden-de-compra'
      },
      {
        name: 'Crear Inventario',
        path: '/orden-registro'
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
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
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
        path: "/item-registro",
        element: <ItemForm />,
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
        path: "/item/:id",
        element: <ItemDetail />,
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
        path: "/contenedor-registro",
        element: <ContenedorForm />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "contenedor",
        path: "/contenedor/:id",
        element: <ContenedorDetail   />,
      },
      // OBJETOS DE CATEGORIAS
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "categoria",
        path: "/categorias",
        element: <Categoria />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "categoria",
        path: "/categoria-registro",
        element: <CategoriaForm  />,
      },
      // OBJETOS DE PROVEEDORES
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "proveedores",
        path: "/proveedores",
        element: <Proveedor   />,
      },
      {
        name: 'proveedores',
        path: '/proveedor-registro',
        element: <ProveedorForm />
      },
      // OBJETOS ORDEN DE COMPRA  
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "orden-de-compra",
        path: "/orden-de-compra",
        element: <OrdenDeCompra  />,
      },
      {
        name: 'proveedores',
        path: '/orden-registro',
        element: <OrdenCompraForm />
      }
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
