import { useEffect, useRef, useState } from "react";
import IconComponent from "../IconComponent";
import { RightArrow } from "../../assets/icons/icons";
import panelAnimations from "./panelAnimations";
import "./SidePanel.css";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SidePanel = () => {
  // State to manage whether the panel is open or closed
  const [open, setOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // References for DOM elements: panel and close button
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reference for storing the GSAP animation timeline
  const timelineRef = useRef<GSAPTimeline | null>(null);

  // Effect to initialize the GSAP timeline for the panel animation
  useEffect(() => {
    const panel = panelRef.current;
    const close = closeBtn.current;
    const content = contentRef.current;

    // Create a new timeline if it doesn't exist
    if (!timelineRef.current) {
      const tl = gsap.timeline({ paused: true });

      // Animation steps for the panel and close button
      tl.to(content, panelAnimations.contentOne)
        .to(panel, panelAnimations.panelOne)
        .to(close, panelAnimations.closeButtonOne)
        .add(() => setContentVisible(true))
        .to(content, panelAnimations.contentTwo);
      // Store the timeline in the reference
      timelineRef.current = tl;
    }
  }, []);

  // Effect to play or reverse the timeline based on the `open` state
  useEffect(() => {
    if (open) {
      setContentVisible(false);
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, [open]);

  // JSX rendering of the side panel and toggle button
  return (
    <div>
      <div className="side-panel">
        <div
          className={
            open === true ? "side-panel-toggle active" : "side-panel-toggle"
          }
          ref={panelRef}
        >
          {open && contentVisible && (
            <div ref={contentRef} className="side-panel-toggle-content"></div>
          )}

          <button
            ref={closeBtn}
            className={
              open === true
                ? "side-panel-toggle-closeBtn active"
                : "side-panel-toggle-closeBtn"
            }
          >
            <IconComponent
              onClick={() => setOpen(!open)}
              icon={RightArrow}
              scale={15}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
