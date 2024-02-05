
import Item from '../Item/ItemList'
import Contenedor from '../contenedor/Contenedor'
import Categorias from '../categoria/Categoria'
import Proveedor from '../proveedor/Proveedor'
import OrdenDeCompra from '../orden_de_compra/OrdenDeCompra'


import ItemForm from '../Item/ItemForm'
import ContenedorForm from '../contenedor/ContenedorForm'
import ProveedorForm from '../proveedor/ProveedorForm'
import CategoriaForm from '../categoria/Edicion/CategoriaForm'
import OrdenCompraForm from '../orden_de_compra/Formulario/OrdenDeCompraForm'

import ItemDetail from '../Item/ItemDetail'
import OrdenCompraDetail from '../orden_de_compra/OrdenCompraDetail'
import ContenedorDetail from '../contenedor/ContenedorDetail'

import Login from '../login/Login'

import axios from 'axios'

export const publicRoutes = [
  {
    path: 'login',
    element: <Login />
  }
]

export const privateRoutes = [
  {
    path: 'item',
    element: <Item />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/item/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'item-registro',
    element: <ItemForm />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/item/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'item/:id',
    element: <ItemDetail />,
    loader: async ({ params }) => {
      try {
        return axios.get(`http://localhost:8000/api/item/${params.id}`)
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'categorias',
    element: <Categorias />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/categoria/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'categoria-registro',
    element: <CategoriaForm />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/categoria/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'contenedores',
    element: <Contenedor />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/contenedor/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'contenedor/:id',
    element: <ContenedorDetail />,
    loader: async ({ params }) => {
      try {
        return axios.get(`http://localhost:8000/api/contenedor/${params.id}`)
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'contenedor-registro',
    element: <ContenedorForm />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/contenedor/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'proveedores',
    element: <Proveedor />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/proveedor/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'proveedor-registro',
    element: <ProveedorForm />,
    loader: async () => {
      try {
        return axios.get('http://localhost:8000/api/proveedor/')
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: 'orden-de-compra',
    element: <OrdenDeCompra />,
  },
  {
    path: 'orden-compra/:id',
    element: <OrdenCompraDetail />,
  },
  {
    path: 'orden-registro',
    element: <OrdenCompraForm />,
  }
]