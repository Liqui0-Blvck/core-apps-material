export const LISTA_MENU = [
  {
    name: 'Home',
    path: '/',
    children: []
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

export const ESTADOS = [
  'Muy mal estado',
  'Mal estado',
  'Regular',
  'Buen estado',
  'Muy buen estado',
  'Nuevo'
]


export const ESTADO_OC = [
  {value: 1, label: 'Creada'},
  {value: 2, label: 'Aprobada'},
  {value: 3, label: 'Rechazada'},
  {value: 4, label: 'Pendiente'},
  {value: 5, label: 'Procesada'},

]


