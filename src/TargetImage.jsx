import { useLayoutEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

/*

useLayoutEffect(() => {
  const handleOrientationChange = () => {
    // Force reload or restart MindAR session
    window.location.reload(); // crude but effective
  };

  window.addEventListener('orientationchange', handleOrientationChange);

  return () => {
    window.removeEventListener('orientationchange', handleOrientationChange);
  };
}, []);

*/

if (typeof AFRAME !== "undefined" && !AFRAME.components["fix-ios-webgl"]) {
    AFRAME.registerComponent("fix-ios-webgl", {
        init: function () {
            const sceneEl = this.el;
            if (sceneEl.renderer) return;
            sceneEl.renderer = new THREE.WebGLRenderer({
                antialias: true,
                powerPreference: "high-performance",
            });
            sceneEl.renderer.outputEncoding = THREE.sRGBEncoding;
        },
    });
}

const TargetImage = () => {
    const videoRef = useRef(null);
    const videoEntityRef = useRef(null);

    useLayoutEffect(() => {
        const videoEl = videoRef.current;
        const videoEntityEl = videoEntityRef.current;

        if (!videoEl || !videoEntityEl) return;

        const handleTargetFound = () => {
            videoEl.muted = false;
            videoEl.play()
        };
        const handleOrientationChange = () => {
            window.location.reload();
        };

        videoEntityEl.addEventListener("targetFound", handleTargetFound);
        videoEntityEl.addEventListener("targetLost", () => videoEl.pause());


        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            videoEntityEl.removeEventListener("targetFound", handleTargetFound);
            videoEntityEl.removeEventListener("targetLost", () => videoEl.pause());
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);


    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
            <a-scene
                fix-ios-webgl
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
                    position="0 1 0"
                ></a-video>
            </a-scene>
        </div>
    );
};

export default TargetImage;