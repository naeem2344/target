// import React, { useEffect, useRef } from 'react'
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// const App = () => {
//   const videoRef = useRef(null);
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     const sceneEl = sceneRef.current;
//     const videoEl = videoRef.current;

//     // Start playing video when target is found
//     sceneEl.addEventListener("targetFound", () => {
//       videoEl.play();
//     });

//     // Pause video when target is lost
//     sceneEl.addEventListener("targetLost", () => {
//       videoEl.pause();
//     });

//     return () => {
//       sceneEl.remove();
//     };
//   }, []);
//   return (
//     <a-scene
//       ref={sceneRef}
//       mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/card.mind: true;"
//       embedded
//       color-space="sRGB"
//       renderer="colorManagement: true, physicallyCorrectLights"
//       vr-mode-ui="enabled: false"
//       device-orientation-permission-ui="enabled: false"
//     >
//       <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//       {/* AR Video Entity */}
//       <a-video
//         ref={videoRef}
//         src="https://youtu.be/w3NeT1bimY0?si=4FwjJZh0g-5iYxRc"
//         position="0 0 0"
//         rotation="-90 0 0"
//         width="1.5"
//         height="0.85"
//         mindar-image-target="targetIndex: 0"
//         autoplay="false"
//         loop="true"
//       ></a-video>
//     </a-scene>
//   )
// }

// export default App;

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
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/card.mind; autoStart: true;"
        embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* AR Video Entity */}
        <a-video
          ref={videoRef}
          src="#myVideo"
          position="0 0 0"
          rotation="-90 0 0"
          width="1.5"
          height="0.85"
          mindar-image-target="targetIndex: 0"
          autoplay="false"
          loop="true"
        ></a-video>

        {/* Define actual video asset (use MP4/WebM instead of YouTube link) */}
        <a-assets>
          <video
            id="myVideo"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js/examples/assets/dance.mp4"
            preload="auto"
            crossOrigin="anonymous"
          ></video>
        </a-assets>
      </a-scene>
    </div>
  );
};

export default App;
