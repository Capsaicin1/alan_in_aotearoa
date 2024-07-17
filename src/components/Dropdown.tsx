import React, { ReactNode } from "react";

type dropDownProps = {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  children: React.ReactNode;
};

const Dropdown = () => {
  const DropdownItem = ({ leftIcon, rightIcon, children }: dropDownProps) => {
    return (
      <a href="#" className="dropdown-item">
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-button">{rightIcon}</span>
      </a>
    );
  };

  return <div></div>;
};

export default Dropdown;
