import React, { useEffect, useRef } from 'react'
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const App = () => {
  const videoRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const videoEl = videoRef.current;

    // Start playing video when target is found
    sceneEl.addEventListener("targetFound", () => {
      videoEl.play();
    });

    // Pause video when target is lost
    sceneEl.addEventListener("targetLost", () => {
      videoEl.pause();
    });

    return () => {
      sceneEl.remove();
    };
  }, []);
  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: ./targets.mind; autoStart: true;"
      embedded
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {/* AR Video Entity */}
      <a-video
        ref={videoRef}
        src="https://youtu.be/w3NeT1bimY0?si=4FwjJZh0g-5iYxRc"
        position="0 0 0"
        rotation="-90 0 0"
        width="1.5"
        height="0.85"
        mindar-image-target="targetIndex: 0"
        autoplay="false"
        loop="true"
      ></a-video>
    </a-scene>
  )
}

export default App;