import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { LISTA_MENU } from '../../const/constantes'
import { Directions } from './MenuDirections'


export default function MenuLateral() {
  const [state, setState] = useState({ left: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      className='h-full'
    >
      <List 
        sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav">
      {LISTA_MENU.map((obj) => (
        <ListItem key={obj.id} disablePadding >
          {obj.name === 'Home' ? (
            <Link to={obj.path} className='w-full shadow-none'>
              <ListItemButton onClick={toggleDrawer(anchor, false)} sx={{ boxShadow: 'none'}}>
                <ListItemText primary={obj.name} />
              </ListItemButton>
            </Link>
          ) : (
            <Accordion className='w-full h-full'>
              <AccordionSummary className='h-10'>
                <ListItemText primary={obj.name} />
              </AccordionSummary>
              <AccordionDetails disablePadding>
                {Directions[obj.name] &&
                  Directions[obj.name](obj.children, toggleDrawer, anchor)}
              </AccordionDetails>
            </Accordion>
          )}
        </ListItem>
      ))}
      
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className='w-full'>
              <img
                src="/src/assets/logosnabbit.gif" alt=""
                className='ml-4 object-cover'
                height={100}
                width={200}/>
            </div>
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  )
}
