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
import ContenedorForm from "./componentes/contenedor/ContenedorForm";
import CategoriaForm from "./componentes/categoria/CategoriaForm";
import ProveedorForm from "./componentes/proveedor/ProveedorForm";
import ItemList from "./componentes/Item/ItemList";
import Categoria from "./componentes/categoria/Categoria";
import Proveedor from "./componentes/proveedor/Proveedor";
import OrdenDeCompra from "./componentes/orden_de_compra/OrdenDeCompra";
import OrdenCompraForm from "./componentes/orden_de_compra/Formulario/OrdenDeCompraForm";
import OrdenCompraDetail from "./componentes/orden_de_compra/OrdenCompraDetail";
import ProveedorDetail from "./componentes/proveedor/ProveedorDetail";

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
    path: '/app/home',
  },
  {
    name: 'Registros',
    path: '',
    children: [
      {
        name: 'Registrar Item',
        path: '/app/item-registro'
      },
      {
        name: 'Registrar Categoria',
        path: '/app/categoria-registro'
      },

      {
        name: 'Registrar Proveedor',
        path: '/app/proveedor-registro'
      }
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
        path: '/app/contenedor-registro'
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
        path: '/app/orden-registro'
      }
    ]
  },
  {
    name: 'Inventario',
    path: '',
    children: [
      {
        name: 'Inventarios',
        path: '/app/orden-de-compra'
      },
      {
        name: 'Crear Inventario',
        path: '/app/orden-registro'
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
      ,
      {
        name: 'proveedor-detalle',
        path: '/proveedor/:id',
        element: <ProveedorDetail />
      },
      {
        name: 'proveedores',
        path: '/proveedor-registro',
        element: <ProveedorForm />
      },
      // OBJETOS ORDEN DE COMPRA  
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "orden-compra",
        path: "/orden-compra",
        element: <OrdenDeCompra  />,
      },
      {
        name: 'proveedores',
        path: '/orden-registro',
        element: <OrdenCompraForm />
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "orden-compra",
        path: "/orden-compra/:id",
        element: <OrdenCompraDetail  />,
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
