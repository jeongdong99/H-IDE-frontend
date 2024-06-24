import React, { useEffect, useRef } from "react";

const ResizeObserverComponent = () => {
  const targetRef = useRef(null);

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        try {
          for (let entry of entries) {
            console.log("Resized:", entry.target);
            // Your resize logic here
          }
        } catch (error) {
          console.error("ResizeObserver error:", error);
        }
      });
    });

    resizeObserver.observe(targetElement);

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      resizeObserver.unobserve(targetElement);
    };
  }, []);

  return (
    <div
      ref={targetRef}
      style={{ width: "100%", height: "200px", backgroundColor: "lightgrey" }}
    >
      Resize me
    </div>
  );
};

export default ResizeObserverComponent;
