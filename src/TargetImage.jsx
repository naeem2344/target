// import React, { useEffect, useLayoutEffect, useRef } from 'react'
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// const TargetImage = () => {
//     const videoRef = useRef(null);
//     const videoEntityRef = useRef(null);

//     useLayoutEffect(() => {
//         const videoEl = videoRef.current;
//         const videoEntityEl = videoEntityRef.current;

//         if (!videoEl || !videoEntityEl) return;

//         // Handlers on the a-video entity (not scene!)
//         const handleTargetFound = () => {
//             videoEl.play().catch(err => console.log("Autoplay blocked:", err));
//         };

//         const handleTargetLost = () => {
//             videoEl.pause();
//         };

//         videoEntityEl.addEventListener("targetFound", handleTargetFound);
//         videoEntityEl.addEventListener("targetLost", handleTargetLost);

//         return () => {
//             videoEntityEl.removeEventListener("targetFound", handleTargetFound);
//             videoEntityEl.removeEventListener("targetLost", handleTargetLost);
//         };
//     }, []);


//     return (
//         <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
//             <a-scene
//                 mindar-image="imageTargetSrc: /target-image/targets.mind; autoStart: true;"
//                 embedded
//                 color-space="sRGB"
//                 renderer="colorManagement: true, physicallyCorrectLights"
//                 vr-mode-ui="enabled: false"
//                 device-orientation-permission-ui="enabled: false"
//                 style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
//             >
//                 <a-assets>
//                     <video
//                         id="myVideo"
//                         ref={videoRef}
//                         src="/target-image/video.mp4"
//                         preload="auto"
//                         muted
//                         playsInline
//                         loop
//                         crossorigin="anonymous"
//                     ></video>
//                 </a-assets>

//                 <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//                 <a-video
//                     ref={videoEntityRef}
//                     src="#myVideo"
//                     position="0 0 0"
//                     rotation="-90 0 0"
//                     width="1.5"
//                     height="0.85"
//                     mindar-image-target="targetIndex: 0"
//                     loop="true"
//                 ></a-video>
//             </a-scene>
//         </div>
//     )
// }

// export default TargetImage


import React, { useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import "aframe-html-shader";

const TargetImage = () => {
  const videoEntityRef = useRef(null);
  const youtubeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoEntityEl = videoEntityRef.current;
    if (!videoEntityEl) return;

    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(youtubeRef.current, {
        events: {
          onReady: (event) => {
            event.target.pauseVideo(); // Start paused
          },
        },
      });
    };

    const handleTargetFound = () => {
      if (playerRef.current) playerRef.current.playVideo();
    };

    const handleTargetLost = () => {
      if (playerRef.current) playerRef.current.pauseVideo();
    };

    videoEntityEl.addEventListener("targetFound", handleTargetFound);
    videoEntityEl.addEventListener("targetLost", handleTargetLost);

    return () => {
      videoEntityEl.removeEventListener("targetFound", handleTargetFound);
      videoEntityEl.removeEventListener("targetLost", handleTargetLost);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <a-scene
        mindar-image="imageTargetSrc: /target-image/targets.mind; autoStart: true;"
        embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* AR plane that will show the YouTube video */}
        <a-plane
          ref={videoEntityRef}
          position="0 0 0"
          rotation="-90 0 0"
          width="1.5"
          height="0.85"
          mindar-image-target="targetIndex: 0"
          material="shader: html; target: #youtubeDiv"
        ></a-plane>
      </a-scene>

      {/* Hidden YouTube iframe */}
      <div style={{ display: "none" }}>
        <div
          id="youtubeDiv"
          ref={youtubeRef}
          data-video-id="iSNoJk5nt3c"
        >
          <iframe
            width="640"
            height="360"
            src="https://youtu.be/iSNoJk5nt3c?si=-ss0rzanGCWBHfti"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TargetImage;
