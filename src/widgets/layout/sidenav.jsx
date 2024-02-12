import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import React, { useState } from "react";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ArrowBack } from "@mui/icons-material";
import { Directions, LISTA_MENU, LISTA_MENU_BODEGA } from "@/routes";


export function Sidenav({ brandImg, brandName, routes }) {
  const [open, setOpen] = useState(true);
  const [rotate, setRotate] = useState(false)
  const [bodegaSnabbitClicked, setBodegaSnabbitClicked] = useState(false);

  const handleClick = (name) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
    setRotate((prev) => !prev);
    if (name === 'Bodega Snabbit') {
      setBodegaSnabbitClicked(true);
    } 
  };

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };



  const renderNestedList = (children) => (
    <List disablePadding className="m-2">
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
          <img src="/img/logosnabbit.gif" alt="logo snabbit consultores" className='w-full h-full object-contain'/>
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
              <p>Accesos</p>
              {
                bodegaSnabbitClicked && <ArrowBack className="animate-pulse cursor-pointer" onClick={() => {setBodegaSnabbitClicked(false)}}/>
              }
            </ListSubheader>

          }
        >
          {(bodegaSnabbitClicked ? LISTA_MENU_BODEGA : LISTA_MENU).map((obj) => {
            return (
              <React.Fragment key={obj.name}>
                {(bodegaSnabbitClicked && (obj.name === 'Bodega Snabbit' || obj.name === 'Gestion Clientes')) ? null : (
                  <React.Fragment>
                    <ListItemButton onClick={() => {handleClick(obj.name)}}>
                      <ListItemText primary={obj.name} />
                      
                    </ListItemButton>
                    <Collapse in={open[obj.name]} timeout="auto" unmountOnExit >
                      {Directions[obj.name] && renderNestedList(obj.children)}
                    </Collapse>
                  </React.Fragment>
                )}
              </React.Fragment>
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
