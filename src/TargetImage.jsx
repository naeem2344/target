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

        // Handlers on the a-video entity (not scene!)
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
                mindar-image="imageTargetSrc: /target-image/targets.mind; autoStart: true; uiError:yes; uiLoading:yes; uiScanning:yes"
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
                        playsInline
                        loop
                        crossorigin="anonymous"
                    ></video>
                </a-assets>

                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                <a-video
                    ref={videoEntityRef}
                    src="#myVideo"
                    position="0 0 0"
                    rotation="-90 0 0"
                    width="1.5"
                    height="0.85"
                    mindar-image-target="targetIndex: 0"
                    loop="true"
                ></a-video>
            </a-scene>
        </div>
    )
}

export default TargetImage