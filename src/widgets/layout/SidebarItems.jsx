import React from 'react';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { Directions } from '@/routes';
import { Link } from 'react-router-dom'

const SidebarItem = ({ obj, open, handleClick, renderNestedList, index }) => {

  return (
    <React.Fragment key={obj.name}>
      <ListItemButton onClick={() => handleClick(obj.name)}>
        {
          obj.name === 'Registros'
            ? <ListItemText primary={obj.name} className='rounded-sm'/>
            : (
              <Link to={obj.path} className='w-full'>
                <ListItemText primary={obj.name} className='rounded-sm'/>
              </Link>
            )
        }
      </ListItemButton>

      <Collapse in={open[obj.name]} timeout="auto" unmountOnExit>
        {Directions[obj.name] && renderNestedList(obj.children, index)}
      </Collapse>
    </React.Fragment>
  );
};

export default SidebarItem;
