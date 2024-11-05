import { func } from "prop-types";
import React from "react";
import { IconType } from "react-icons";

interface IconStar {
  icon: IconType;
}

/**
 * Returns a React component that takes a React Icon as a prop
 * This allows me to use React icons with React, Typescript
 */
const IconComponent: React.FC<IconStar & React.ComponentProps<IconType>> = ({
  icon: Icon,
  ...props
}) => {
  return <Icon {...props} />;
};
IconComponent.propTypes = {
  icon: func.isRequired,
};

export default IconComponent;
