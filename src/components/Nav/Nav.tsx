import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Nav/Nav.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import switchAnimations from "./switchAnimations";

function Nav(props: React.PropsWithChildren) {
  // References to DOM elements for manipulation with GSAP
  const circleRef = useRef(null);
  const switchRef = useRef(null);

  // State to track whether user has scrolled -> Not used now
  const [scroll, setScroll] = useState(false);
  // State to manage off/on status of the switch
  const [switchState, setSwitchState] = useState("off");

  // Constants defining the dimensions of the switch and circle for animation purposes
  const CIRCLE_WIDTH = 20;
  const SWITCH_WIDTH = 50;

  // GSAP timeline
  const tl = gsap.timeline();

  // Effect triggers GSAP animations when the switchState changes
  useEffect(() => {
    if (switchState === "on") {
      tl.to(circleRef.current, switchAnimations.circleOn, "start").to(
        switchRef.current,
        switchAnimations.switchOn,
        "start"
      );
    } else {
      tl.to(circleRef.current, switchAnimations.circleOff, "reverse").to(
        switchRef.current,
        switchAnimations.switchOff,
        "reverse"
      );
    }

    // Cleanup function to kill the GSAP timeline when the component unmounts
    return () => {
      tl.kill();
    };
  }, [switchState, tl]);

  useGSAP(() => {
    gsap.set(".spotlight", { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(".spotlight", "x", {
        duration: 0.6,
        ease: "power3",
      }),
      yTo = gsap.quickTo(".spotlight", "y", { duration: 0.6, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
  });

  // Handle click event to toggle the switch's state between "on" and "off"
  const handleClick = () => {
    if (switchState === "on") {
      setSwitchState("off");
    } else {
      setSwitchState("on");
    }
  };

  // Effect to detect scrolling and update the `scroll` state based on window scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={scroll ? "navbar scrolled" : "navbar"}>
        <Link className="logo" to="/">
          Aotearoa
        </Link>
        {/* Navigation items, passed as children from parent component */}
        <ul className="navbar-nav"> {props.children} </ul>
        <div
          className="switch-container"
          ref={switchRef}
          style={{ width: SWITCH_WIDTH }}
          onClick={() => handleClick()}
        >
          <div
            className="switch-circle"
            ref={circleRef}
            style={{ width: CIRCLE_WIDTH }}
          ></div>
        </div>
      </div>
      {/* <div className="spotlight"></div> */}
    </>
  );
}

// Navigation item component to render individual links in the navigation bar
function NavItem({ content, path }: navItemProps) {
  return (
    <li className="nav-item">
      <Link to={path} className="icon-button">
        {content}
      </Link>
    </li>
  );
}

// Type definition for NavItem props
interface navItemProps {
  content: string;
  path: string;
}

export { Nav, NavItem };
