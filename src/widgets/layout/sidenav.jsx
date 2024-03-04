import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import React, { useState } from "react";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { LISTA_MENU } from "@/routes";
import SidebarItem from "@/widgets/layout/SidebarItems";
import { useClient } from "@/context/ClientContext";
import { IconButton } from "@material-tailwind/react";


export function Sidenav() {
  const { clientInfo, setClient, removeClient } = useClient()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [rotate, setRotate] = useState(false)

  const handleClick = (name) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
    setRotate((prev) => !prev);
  };

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };



  const renderNestedList = (children, index) => (
    <List disablePadding className="m-2" key={index}>
      {children.map((child) => (
        <ListItem key={child.id} disablePadding className="ml-5 w-[90%] mb-2 bg-gray-50" onClick={() => {
          setOpenSidenav(dispatch, false)
          setOpen(false)
        }}>
          <Link to={child.path} className='w-full h-full shadow-none'>
            <ListItemText primary={child.name} />
          </Link>
        </ListItem>
      ))}
    </List> 
  );


  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-scroll overflow-hidden`}
    >
      <div
        className={`relative`}
      >
        <Link to="/app/home" className="py-6 px-8 text-center flex" onClick={() => setOpenSidenav(dispatch, false)}>
          {/* <img src="/img/logosnabbit.gif" alt="logo snabbit consultores" className='w-full h-full object-contain'/> */}
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="">
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" className="flex w-full justify-between items-center">
              <p>Accesos {clientInfo && clientInfo.nombre}</p>
            </ListSubheader>

          }
        >
          {LISTA_MENU.map((obj, index) => {
            return (
              <SidebarItem
                key={index}
                obj={obj}
                open={open}
                handleClick={handleClick}
                renderNestedList={renderNestedList}/>
            )
          })}
        </List>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
