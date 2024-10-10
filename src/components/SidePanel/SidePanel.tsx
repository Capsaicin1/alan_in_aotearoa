import { useEffect, useRef, useState } from "react";
import IconComponent from "../IconComponent";
import { RightArrow } from "../../assets/icons/icons";
import panelAnimations from "./panelAnimations";
import "./SidePanel.css";
// import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const darkSkyLayerIDs = [
  "Toggle All",
  "Dark Sky Reserves",
  "Dark Sky Sanctuaries",
  "Dark Sky Park",
];
const viirsLayerIDs = [
  "VIIRS 2023",
  "VIIRS 2022",
  "VIIRS 2021",
  "VIIRS 2020",
  "VIIRS 2019",
  "VIIRS 2018",
  "VIIRS 2017",
  "VIIRS 2016",
  "VIIRS 2015",
  "VIIRS 2014",
  "VIIRS 2013",
  "VIIRS 2012",
];

const SidePanel = () => {
  // State to manage whether the panel is open or closed
  const [open, setOpen] = useState(false);

  const [scroll, setScroll] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // References for DOM elements: panel and close button
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const layerHeadingRef = useRef<HTMLDivElement>(null);

  // Reference for storing the GSAP animation timeline
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const timelineRef2 = useRef<GSAPTimeline | null>(null);

  // Effect to initialize the GSAP timeline for the panel animation
  useEffect(() => {
    const panel = panelRef.current;
    const close = closeBtn.current;
    const content = contentRef.current;
    const layerHeader = layerHeadingRef.current;

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

    if (!timelineRef2.current) {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".layers-collapsible",
          start: 20,
          end: 0,
          scrub: true,
          markers: false,
        },
      });

      tl2.to(layerHeader, {
        background: "#484a4d",
      });

      timelineRef2.current = tl2;
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
            <div ref={contentRef} className="side-panel-toggle-content">
              <div
                className={`layers-collapsible ${
                  isAccordionOpen ? "open" : ""
                }`}
              >
                <div className="toggle">
                  <div
                    ref={layerHeadingRef}
                    className="flex-wrapper"
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  >
                    <h3>Layers</h3>
                    <div className="direction-indicator">
                      {isAccordionOpen ? "-" : "+"}
                    </div>
                  </div>

                  {isAccordionOpen && (
                    <div className="content-parent">
                      <div className="content">
                        {darkSkyLayerIDs.map((layerId) => (
                          <div className="content-item">
                            <p>{layerId}</p>
                            <div className="btn-container">
                              <label className="custom-radio-btn">
                                <input
                                  className={`${layerId}-btn`}
                                  type="radio"
                                  name="darkSky"
                                  id={layerId}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        ))}
                        <div className="divider"></div>
                        {viirsLayerIDs.map((layerId) => (
                          <div className="content-item">
                            <p>{layerId}</p>
                            <div className="btn-container">
                              <label className="custom-radio-btn">
                                <input
                                  className={`${layerId}-btn`}
                                  type="radio"
                                  name="VIIRS"
                                  id={layerId}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
              onClick={() => {
                setOpen(!open);
                setIsAccordionOpen(false);
              }}
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
