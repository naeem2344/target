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
//                         src="/target-image/hon.mp4"
//                         preload="auto"
//                         playsinline
//                         loop
//                         muted
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


import { useLayoutEffect, useRef } from 'react'
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const TargetImage = () => {
    const videoRef = useRef(null);
    const videoEntityRef = useRef(null);

    useLayoutEffect(() => {
        const videoEl = videoRef.current;
        const videoEntityEl = videoEntityRef.current;

        if (!videoEl || !videoEntityEl) return;

        const handleTargetFound = () => {
            videoEl.play().catch(err => console.log("Autoplay blocked:", err));
        };

        const handleTargetLost = () => {
            videoEl.pause();
        };

        videoEntityEl.addEventListener("targetFound", handleTargetFound);
        videoEntityEl.addEventListener("targetLost", handleTargetLost);

        return () => {
            videoEntityEl.removeEventListener("targetFound", handleTargetFound);
            videoEntityEl.removeEventListener("targetLost", handleTargetLost);
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
            <a-scene
                mindar-image="imageTargetSrc: /target-image/gor.mind; autoStart: true;"
                embedded
                color-space="sRGB"
                renderer="colorManagement: true, physicallyCorrectLights"
                vr-mode-ui="enabled: false"
                device-orientation-permission-ui="enabled: false"
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            >
                <a-assets>
                    <video
                        id="myVideo"
                        ref={videoRef}
                        src="/target-image/hon.mp4"
                        preload="auto"
                        playsinline
                        loop
                        muted
                        crossorigin="anonymous"
                        style={{ height: '400px', border: '1px solid red' }}
                    ></video>
                </a-assets>

                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                <a-video
                    ref={videoEntityRef}
                    src="#myVideo"
                    mindar-image-target="targetIndex: 0"
                    loop="true"
                    width="1"
                    height="0.5625"
                    position="0 0.2 0"
                ></a-video>
            </a-scene>
        </div>
    )
}

export default TargetImage;



// import { useLayoutEffect, useRef } from "react";
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// if (typeof AFRAME !== "undefined" && !AFRAME.components["fix-ios-webgl"]) {
//     AFRAME.registerComponent("fix-ios-webgl", {
//         init: function () {
//             const sceneEl = this.el;
//             if (sceneEl.renderer) return;
//             sceneEl.renderer = new THREE.WebGLRenderer({
//                 antialias: true,
//                 powerPreference: "high-performance",
//             });
//             sceneEl.renderer.outputEncoding = THREE.sRGBEncoding;
//         },
//     });
// }

// const TargetImage = () => {
//     const videoRef = useRef(null);
//     const videoEntityRef = useRef(null);

//     useLayoutEffect(() => {
//         const videoEl = videoRef.current;
//         const videoEntityEl = videoEntityRef.current;

//         if (!videoEl || !videoEntityEl) return;

//         const handleTargetFound = () => {
//             videoEl.play()
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
//         <div
//             style={{
//                 width: "100vw",
//                 height: "100vh",
//                 margin: 0,
//                 padding: 0,
//                 overflow: "hidden",
//             }}
//         >
//             <a-scene
//                 fix-ios-webgl
//                 mindar-image="imageTargetSrc: /target-image/targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001;"
//                 embedded
//                 renderer="colorManagement: false, physicallyCorrectLights: false"
//                 vr-mode-ui="enabled: false"
//                 device-orientation-permission-ui="enabled: false"
//                 style={{
//                     width: "100%",
//                     height: "100%",
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                 }}
//             >
//                 {/* Assets */}
//                 <a-assets>
//                     <video
//                         id="myVideo"
//                         ref={videoRef}
//                         src="/target-image/hon.mp4"
//                         preload="auto"
//                         playsinline
//                         // muted
//                         loop
//                         crossorigin="anonymous"
//                     ></video>
//                 </a-assets>

//                 {/* Camera */}
//                 <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//                 {/* Video overlay on target */}
//                 <a-video
//                     ref={videoEntityRef}
//                     src="#myVideo"
//                     position="0 0 0"
//                     rotation="-90 0 0"
//                     width="1.5"
//                     height="0.85"
//                     mindar-image-target="targetIndex: 0"
//                 ></a-video>
//             </a-scene>
//         </div>
//     );
// };

// export default TargetImage;