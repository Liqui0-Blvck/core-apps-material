import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

const SidebarItem = ({ obj, open, handleClick, renderNestedList, index }) => {
  return (
    <React.Fragment key={obj.name}>
      <ListItemButton>
        <ListItemText>{obj.name}</ListItemText>
      </ListItemButton>
    </React.Fragment>
  );
};

export default SidebarItem;
