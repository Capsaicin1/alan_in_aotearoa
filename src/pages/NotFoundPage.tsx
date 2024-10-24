import { Link } from "react-router-dom";
import { CSSProperties, useState } from "react";

const NotFoundPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={style.notFound}>
      Oops! It seems that this page doesn't exist...
      <Link
        style={
          isHovered
            ? { ...style.homeButton, ...style.homeButtonHover }
            : style.homeButton
        }
        to={"/"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Back Home
      </Link>
    </div>
  );
};

const style: {
  notFound: CSSProperties;
  homeButton: CSSProperties;
  homeButtonHover: CSSProperties;
} = {
  notFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontSize: "30px",
    color: "white",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#121212", // Optional: a dark background to fit the theme
  },
  homeButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(71, 74, 77, 0.4)",
    textDecoration: "none",
    color: "#dadce1",
    backgroundColor: "rgb(36, 37, 38)",
    transition: "background-color 0.3s ease, border-color 0.3s ease", // Smooth transition
    cursor: "pointer", // Makes it clear it's a clickable button
  },
  homeButtonHover: {
    backgroundColor: "rgba(71, 74, 77, 0.8)", // Slightly lighter color on hover
    borderColor: "rgba(71, 74, 77, 1)", // Solid border on hover
  },
};

export default NotFoundPage;
