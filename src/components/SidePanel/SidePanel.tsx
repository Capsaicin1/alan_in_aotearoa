import { useEffect, useRef, useState } from "react";
import IconComponent from "../IconComponent";
import { RightArrow } from "../../assets/icons/icons";
import panelAnimations from "./panelAnimations";
import "./SidePanel.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Define types for layer IDs
interface LayersCollapsibleProps {
  darkSkyLayerIDs: string[];
  viirsLayerIDs: string[];
  isAccordionOpen: boolean;
  setIsAccordionOpen: (state: boolean) => void;
  selectedDarkSkyCat: string;
  setSelectedDarkSkyCat: (layer: string) => void;
  onLayerSelect: (layer: string) => void;
}

const darkSkyLayerIDs: string[] = [
  "Toggle All",
  "Dark Sky Reserves",
  "Dark Sky Sanctuaries",
  "Dark Sky Parks",
  "None",
];

const toggleAll = "Toggle All";

const viirsLayerIDs: string[] = [
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

const LayersCollapsible = ({
  darkSkyLayerIDs,
  viirsLayerIDs,
  isAccordionOpen,
  setIsAccordionOpen,
  selectedDarkSkyCat,
  setSelectedDarkSkyCat,
  onLayerSelect,
}: LayersCollapsibleProps) => {
  const layerHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layerHeader = layerHeadingRef.current;

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
  }, []);

  return (
    <div className={`layers-collapsible ${isAccordionOpen ? "open" : ""}`}>
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
                <div className="content-item" key={layerId}>
                  <p>{layerId}</p>
                  <div className="btn-container">
                    <label className="custom-radio-btn">
                      <input
                        className={`${layerId}-btn`}
                        type="radio"
                        name="darkSky"
                        id={layerId}
                        checked={selectedDarkSkyCat === layerId}
                        onChange={() => {
                          setSelectedDarkSkyCat(layerId);
                          onLayerSelect(layerId);
                          //Save the selected item to local storage
                          localStorage.setItem("selectedDarkSkyCat", layerId);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              ))}
              <div className="divider"></div>
              {viirsLayerIDs.map((layerId) => (
                <div className="content-item" key={layerId}>
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
  );
};

const SidePanel = ({
  onLayerSelect,
}: {
  onLayerSelect: (layerId: string) => void; // Expect a callback as a prop
}) => {
  const [open, setOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // State controls selected layer, initialized from localStorage or defaults to "Toggle All". This allows the layer a user selected to persist over multiple sessions.
  const [selectedDarkSkyCat, setSelectedDarkSkyCat] = useState<string>(
    () => localStorage.getItem("selectedDarkSkyCat") || toggleAll
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const close = closeBtn.current;
    const content = contentRef.current;

    if (!timelineRef.current) {
      const tl = gsap.timeline({ paused: true });

      tl.to(content, panelAnimations.contentOne)
        .to(panel, panelAnimations.panelOne)
        .to(close, panelAnimations.closeButtonOne)
        .add(() => setContentVisible(true))
        .to(content, panelAnimations.contentTwo);

      timelineRef.current = tl;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setContentVisible(false);
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, [open]);

  return (
    <div>
      <div className="side-panel">
        <div
          className={open ? "side-panel-toggle active" : "side-panel-toggle"}
          ref={panelRef}
        >
          {open && contentVisible && (
            <div ref={contentRef} className="side-panel-toggle-content">
              <LayersCollapsible
                darkSkyLayerIDs={darkSkyLayerIDs}
                viirsLayerIDs={viirsLayerIDs}
                isAccordionOpen={isAccordionOpen}
                setIsAccordionOpen={setIsAccordionOpen}
                selectedDarkSkyCat={selectedDarkSkyCat}
                setSelectedDarkSkyCat={setSelectedDarkSkyCat}
                onLayerSelect={onLayerSelect}
              />
            </div>
          )}

          <button
            ref={closeBtn}
            className={
              open
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
