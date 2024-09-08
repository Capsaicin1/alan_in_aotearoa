import { useRef, useState } from "react";
import IconComponent from "./IconComponent";
import { RightArrow, CloseX } from "../assets/icons/icons";
import "./SidePanel.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SidePanel = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const panel = panelRef.current;
    const close = closeBtn.current;
    const tl = gsap.timeline({ paused: true });
    tl.to(close, {
      opacity: 0,
    })
      .to(panel, {
        width: "500px",
        height: "700px",
        y: -300,
        margin: "10px 40px",
        borderRadius: "15px",
        opacity: 0.95,
        duration: 0.25,
        ease: "circ.in",
        delay: 0.2,
      })
      .to(close, {
        opacity: 1,
        duration: 0.25,
        delay: 0.2,
      });

    if (open) tl.play();
    else if (open === false) tl.reverse();
  }, [open]);

  return (
    <div>
      <div className="side-panel">
        <div className="side-panel-toggle" ref={panelRef}>
          <button
            ref={closeBtn}
            onClick={() => {
              setOpen(!open);
              console.log(open);
            }}
          >
            {open ? (
              <IconComponent icon={CloseX} scale={15} />
            ) : (
              <IconComponent icon={RightArrow} scale={15} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
