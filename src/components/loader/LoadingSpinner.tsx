import "./loadingSpinner.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Loading spinner that just renders a spinning svg -> see the <img/>
const LoadingSpinner = () => {
  const spinnerRef = useRef(null);

  //Make spinner appear and disappear smoother
  useGSAP(() => {
    return () => {
      gsap.to(spinnerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    };
  });

  return (
    <div ref={spinnerRef} className="spinner">
      <img src="/Spinner2.svg" alt="Loading Spinner" />
    </div>
  );
};

export default LoadingSpinner;
