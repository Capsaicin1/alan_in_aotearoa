import React, { ReactNode, useState } from "react";
import "./Menu.css";

type Icon = {
  icon: ReactNode;
};

/**
 * NOT using this component at all
 */
const Menu = (props: React.PropsWithChildren) => {
  return (
    <div>
      <div className="menu">
        <ul className="menu-button">{props.children}</ul>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, children }: Icon & React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="menu-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </a>

      {open && children}
    </li>
  );
};

export { Menu, MenuItem };
