import { useContext } from 'react'
import { useState } from 'react'
import MenuLateral from '../menu/Drawler'
import TransitionsModal from '../Item/Modal/ModalSearchItem'
import AccountMenu from '../../widgets/layout/AccountMenu'
import AuthContext from '../../context/AuthContext'


const Navbar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const { authTokens: user } = useContext(AuthContext)

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16 w-[90%] mx-auto'>
      <header className='relative bg-white'>
        <div className="border-b border-gray-200 mx-auto">
          <div className='flex h-16 items-center justify-between w-full gap-10'>

            <div className=' w-9 h-9'>
              {
                user
                  ? <MenuLateral />
                  : null
              }
            </div>

            <div className='flex items-center'>
              {
                user
                  ? <TransitionsModal setBusqueda={setBusqueda} setResultados={setResultados} busqueda={busqueda} resultados={resultados}/>
                  : null
              }
              {
                user
                  ? (
                      <AccountMenu />
                    )
                  : null
              }
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
