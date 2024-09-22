const animations = {
  closeButtonOne: {
    opacity: 0,
    duration: 0.2,
  },
  closeButtonTwo: {
    opacity: 1,
    duration: 0.15,
    delay: 0.05,
  },
  panelOne: {
    width: "500px",
    height: "700px",
    y: -300,
    margin: "10px 60px",
    borderRadius: "15px",
    opacity: 0.95,
    duration: 0.15,
    ease: "circ.in",
    delay: 0.05,
  },
  contentOne: {
    opacity: 0,
    border: "0px",
    duration: 0.2,
  },
  contentTwo: {
    opacity: 1,
    border: "5px solid white",
    duration: 0.2,
  },
};

export default animations;
