import React from 'react';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { Directions } from '@/routes';
import { Link } from 'react-router-dom'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

const SidebarItem = ({ obj, open, isOpen, handleClick, renderNestedList, index }) => {
  return (
    <React.Fragment key={obj.name}>
      <ListItemButton onClick={() => handleClick(obj.name)}>
        {
          obj.name === 'Registros' ||
          obj.name === 'Recepción MP' 
            ? (
              <>
                <ListItemText primary={obj.name} className='rounded-sm'/>
              </>
            )
            : (
              <Link to={obj.path} className='w-full flex items-center'>
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
