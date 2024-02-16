import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText, Collapse } from '@mui/material';
import { Directions } from '@/routes'

const SidebarItem = ({ obj, mainMenu, open, handleClick, renderNestedList, index }) => {
  return (
    <React.Fragment key={obj.name}>
      {(
        mainMenu.bodegaSnabbit || mainMenu.gestionClientes) &&
        (obj.name === 'Bodega Snabbit' || obj.name === 'Gestion Clientes')
        ? null
        : (
          <React.Fragment>
            <ListItemButton onClick={() => handleClick(obj.name)}>
              {
                obj.name === 'Clientes' || obj.name === 'Registro Clientes'
                  ? (
                    <Link to={obj.path} className='w-full'>
                      <ListItemText primary={obj.name} className='rounded-sm'/>
                    </Link>
                  )
                  : <ListItemText primary={obj.name} />
              }
            </ListItemButton>
            <Collapse in={open[obj.name]} timeout="auto" unmountOnExit>
              {Directions[obj.name] && renderNestedList(obj.children, index)}
            </Collapse>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
};

export default SidebarItem;
