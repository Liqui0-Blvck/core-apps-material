import { ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const AccordionSubItem = ({ name, path, anchor, toggleDrawer }) => {
  return (
    <Link to={path} key={path} className='w-full p-0'>
      <ListItemButton onClick={toggleDrawer(anchor, false)}>
        <ListItemText>
          {name}
        </ListItemText>
      </ListItemButton>
   </Link>
  )
}

export default AccordionSubItem
