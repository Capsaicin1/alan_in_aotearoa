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
  viirsLayerIDs: viirsLayer[];
  isAccordionOpen: boolean;
  setIsAccordionOpen: (state: boolean) => void;
  selectedDarkSkyCat: string;
  setSelectedDarkSkyCat: (layer: string) => void;

  selectedNTLlayer: string;
  setSelectedNTLlayer: (layer: string) => void;

  selectedVIIRSlayer: string;
  setSelectedVIIRSlayer: (layer: string) => void;

  onLayerSelect: (changes: change[]) => void;
}

interface viirsLayer {
  label: string;
  id: string;
}

const darkSkyLayerIDs: string[] = [
  "Toggle All",
  "Dark Sky Reserves",
  "Dark Sky Sanctuaries",
  "Dark Sky Parks",
  "None",
];

const changeLayerIds = ["NTLBrighter", "NTLDarker", "None"];

const toggleAll = "Toggle All";

const viirsLayerIDs: viirsLayer[] = [
  { label: "VIIRS 2012", id: "2012" },
  { label: "VIIRS 2013", id: "2013" },
  { label: "VIIRS 2014", id: "2014" },
  { label: "VIIRS 2015", id: "2015" },
  { label: "VIIRS 2016", id: "2016" },
  { label: "VIIRS 2017", id: "2017" },
  { label: "VIIRS 2018", id: "2018" },
  { label: "VIIRS 2019", id: "2019" },
  { label: "VIIRS 2020", id: "2020" },
  { label: "VIIRS 2021", id: "2021" },
  { label: "VIIRS 2022", id: "2022" },
  { label: "VIIRS 2023", id: "2023" },
  { label: "None", id: "none" },
];

interface change {
  layerID: string;
  flag: "dks" | "vis" | "ntl";
}
const layerChanges: change[] = [];

const LayersCollapsible = ({
  darkSkyLayerIDs,
  viirsLayerIDs,
  isAccordionOpen,
  setIsAccordionOpen,
  selectedDarkSkyCat,
  setSelectedDarkSkyCat,
  setSelectedNTLlayer,
  selectedNTLlayer,
  onLayerSelect,
  selectedVIIRSlayer,
  setSelectedVIIRSlayer,
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
                          // onLayerSelect(layerId);
                          layerChanges.push({ layerID: layerId, flag: "dks" });
                          console.log(layerChanges);
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
              {changeLayerIds.map((layerId) => (
                <div className="content-item" key={layerId}>
                  <p>{layerId}</p>
                  <div className="btn-container">
                    <label className="custom-radio-btn">
                      <input
                        className={`${layerId}-btn`}
                        type="radio"
                        name="overallChange"
                        id={layerId}
                        checked={selectedNTLlayer === layerId}
                        onChange={() => {
                          setSelectedNTLlayer(layerId);
                          // onLayerSelect(layerId);
                          layerChanges.push({ layerID: layerId, flag: "ntl" });
                          console.log(layerChanges);
                          localStorage.setItem("selectedNTLlayer", layerId);
                          console.log(selectedNTLlayer);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              ))}
              <div className="divider"></div>
              {viirsLayerIDs.map(({ label, id }) => (
                <div className="content-item" key={`${label} ${id}`}>
                  <p>{label}</p>
                  <div className="btn-container">
                    <label className="custom-radio-btn">
                      <input
                        className={`${label}-btn`}
                        type="radio"
                        name="VIIRS"
                        id={id}
                        checked={selectedVIIRSlayer === id}
                        onChange={() => {
                          setSelectedVIIRSlayer(id);
                          // onLayerSelect(id);
                          layerChanges.push({ layerID: id, flag: "vis" });
                          console.log(layerChanges);
                          localStorage.setItem("selectedVIIRSlayer", id);
                          console.log(`Selected: ${selectedVIIRSlayer}`);
                        }}
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
  onLayerSelect: (changes: change[]) => void; // Expect a callback as a prop
}) => {
  const [open, setOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // State controls selected layer, initialized from localStorage or defaults to "Toggle All". This allows the layer a user selected to persist over multiple sessions.
  const [selectedDarkSkyCat, setSelectedDarkSkyCat] = useState<string>(
    () => localStorage.getItem("selectedDarkSkyCat") || toggleAll
  );

  const [selectedNTLlayer, setSelectedNTLlayer] = useState<string>(
    () => localStorage.getItem("selectedNTLlayer") || "None"
  );

  const [selectedVIIRSlayer, setSelectedVIIRSlayer] = useState<string>(
    () => localStorage.getItem("selectedVIIRSlayer") || "none"
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
                setSelectedNTLlayer={setSelectedNTLlayer}
                selectedNTLlayer={selectedNTLlayer}
                selectedVIIRSlayer={selectedVIIRSlayer}
                setSelectedVIIRSlayer={setSelectedVIIRSlayer}
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
