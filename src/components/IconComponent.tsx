import { func } from "prop-types";
import React from "react";
import { IconType } from "react-icons";

interface IconStar {
  icon: IconType;
}

/**
 * Returns a react component that takes a React Icon as a prop
 * This allows mr to use react icons with React, Typescript
 */
const IconComponent: React.FC<IconStar> = ({ icon: Icon }) => {
  return <Icon />;
};
IconComponent.propTypes = {
  icon: func.isRequired,
};

export default IconComponent;
