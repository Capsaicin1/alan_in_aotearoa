import React, { useState, useEffect } from "react";
import "./Accordion.css";

// Define the type for each item in the Accordion
interface AccordionItem {
  id: number;
  label: string;
  renderContent: () => React.ReactNode;
  toggled?: boolean;
}

//Define the props for the Accordion Component
interface AccordionProps {
  items: AccordionItem[];
  keepOtherOpen: boolean;
}

//Functional component for Accordion
const Accordion: React.FC<AccordionProps> = ({ items, keepOtherOpen }) => {
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([]);

  /**
   * The useEffect initializes the accordionItems state based on the items prop when the component
   * first renders or when the items prop changes. This ensures consistency by setting the toggled property
   * to false for all items, ensuring that all accordion items start in a closed state whenever
   * the items prop is updated.
   */
  useEffect(() => {
    if (items) {
      setAccordionItems([
        ...items.map((item) => ({
          ...item,
          toggled: false,
        })),
      ]);
    }
  }, [items]);

  /**
   * Toggles the accordion items open and closed by updating the state of
   * the current items in the Accordion -> loops over this array & if the id
   * of the item == the current iteration -> flip toggled state.
   * @param clickedItem
   * @returns accordionItems and their toggled state.
   */
  function handleAccordionToggle(clickedItem: AccordionItem) {
    setAccordionItems([
      ...accordionItems.map((item) => {
        let toggled = item.toggled;

        if (clickedItem.id === item.id) {
          toggled = !item.toggled;
        } else if (!keepOtherOpen) {
          toggled = false;
        }

        return {
          ...item,
          toggled,
        };
      }),
    ]);
  }

  //Render the Accordion component
  return (
    <div className="accordion-parent">
      {accordionItems?.map((listItem, key) => {
        return (
          <div
            className={`accordion ${listItem.toggled ? "toggled" : ""}`}
            key={key}
          >
            <button className="toggle">
              <div
                className="flex-wrapper"
                onClick={() => handleAccordionToggle(listItem)}
              >
                <p>{listItem.label}</p>
                <div className="direction-indicator">
                  {listItem.toggled ? "-" : "+"}
                </div>
              </div>

              <div className="content-parent">
                <div className="content">{listItem.renderContent()}</div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
