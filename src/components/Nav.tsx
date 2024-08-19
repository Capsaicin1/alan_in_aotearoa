import React, { useEffect, useRef, useState } from "react";
import "../components/Nav.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Nav(props: React.PropsWithChildren) {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [scroll, setScroll] = useState(false);

  useGSAP(() => {
    const navEl = navRef.current;
    const logoEl = logoRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: navEl,
        start: 20,
        end: 0,
        scrub: true,
        markers: false,
      },
    });

    tl.to(navEl, {
      borderBottom: "1px solid #dadce1",
      margin: 0,
      duration: 1.7,
      ease: "power3.out",
    });
  }, {});

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 5);
    });
  }, []);

  return (
    <div className={scroll ? "navbar scrolled" : "navbar"} ref={navRef}>
      <a className="logo" href="#" ref={logoRef}>
        Aotearoa
      </a>
      <ul className="navbar-nav"> {props.children} </ul>
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
