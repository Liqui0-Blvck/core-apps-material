import { useContext } from 'react'
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { publicRoutes, privateRoutes } from './ListRoutes' 

// import useAuth from ''

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

const Routes = () => {
  const { authTokens } = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        ...publicRoutes,
        ...(!authTokens ? publicRoutes : []),
        ...privateRoutes
      ]
    }
  ])

  
  return <RouterProvider router={router}/>
}

export default Routes

  
// {
//   path: 'proveedor',
//   element: <Proveedor />,
//   loader: async () => {
//     try {
//       return axios.get('http://localhost:8000/api/proveedor/')
//     } catch (error) {
//       console.log(error)
//     }
//   }
// },