import React, { ReactNode, useState } from "react";

const Menu = (props: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="menu">
      <div className="menu-button">{props.children}</div>
    </div>
  );
};

const MenuItem = (props: Icon) => {
  return (
    <li className="menu-item">
      <a href="#" className="icon-button">
        {props.icon}
      </a>
    </li>
  );
};

type Icon = {
  icon: ReactNode;
};

export { Menu, MenuItem };
