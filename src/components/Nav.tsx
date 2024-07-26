import React from "react";
import "../components/Nav.css";

function Nav(props: React.PropsWithChildren) {
  document.addEventListener("scroll", () => {});

  return (
    <div>
      <div className="navbar">
        <a className="logo" href="#">
          Aotearoa
        </a>
        <ul className="navbar-nav"> {props.children} </ul>
      </div>
    </div>
  );
}

function NavItem(props: navItemProps) {
  return (
    <li className="nav-item">
      <a href="#" className="icon-button">
        {props.text}
      </a>
    </li>
  );
}

type navItemProps = {
  text: string;
};

export { Nav, NavItem };
