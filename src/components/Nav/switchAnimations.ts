import { Elastic } from "gsap";
const CIRCLE_WIDTH = 20;
const SWITCH_WIDTH = 50;

const switchAnimations = {
  circleOn: {
    duration: 0.5,
    x: SWITCH_WIDTH - CIRCLE_WIDTH, // Move the circle to the right
    backgroundColor: "#51ff0d", // Change circle color to green
    ease: Elastic.easeOut.config(1, 0.6), // Elastic easing effect
  },
  circleOff: {
    duration: 0.5,
    x: 0, // Move the circle back to the left
    backgroundColor: "#dadce1", // Change circle color to gray
    ease: Elastic.easeOut.config(1, 0.6), // Elastic easing effect
  },
  switchOn: {
    duration: 0.5,
    borderColor: "#51ff0d", // Change switch border color to green
  },
  switchOff: {
    duration: 0.5,
    borderColor: "#dadce1", // Change switch border color to gray
  },
};

export default switchAnimations;
