import AccordionSubItem from "./AccordionSubItem";

export const Directions = {
  'Registros': (children, toggleDrawer, anchor) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name} 
          path={subitem.path}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
        />
      ))}
    </>
  ),
  'Bodega': (children, toggleDrawer, anchor) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name} 
          path={subitem.path}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
        />
      ))}
    </>
  ),
  'Orden de compra': (children, toggleDrawer, anchor) => (
    <>
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name} 
          path={subitem.path}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
        />
      ))}
    </>
  ),
  'Directions': (children, toggleDrawer, anchor) => (
    <>
      {/* Lógica específica para 'Directions' */}
      {children.map((subitem) => (
        <AccordionSubItem
          key={subitem.id}
          name={subitem.name} 
          path={subitem.path}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
        />
      ))}
    </>
  ),
  // ... Puedes agregar más acciones según sea necesario
};
