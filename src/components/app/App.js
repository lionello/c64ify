import { useState, useEffect, useRef, useCallback } from "react";

import Settings from "components/settings/Settings";
import Glcanvas from "components/glcanvas/Glcanvas";

import "./app.scss";
function App() {
  const isPhone = useRef(
    Math.min(window.screen.width, window.screen.height) < 600
  );
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [isRendering, setIsRendering] = useState(false);
  const [settings, setSettings] = useState({ filterSize: 8, camSrc: null });

  const [canvas, setCanvas] = useState();
  const [cameras, setCameras] = useState([]);

  const onSaveImage = useCallback(() => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = `c64ified_${new Date()
      .getTime()
      .toString()
      .substr(-6)}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [canvas]);

  useEffect(() => {
    const onRes = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    const checkCameras = async () => {
      try {
        if (navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          const devices = await navigator.mediaDevices.enumerateDevices();

          stream.getTracks().forEach((t) => t.stop());

          setCameras(
            devices
              .filter((e) => e.kind === "videoinput")
              .map((e) => e.deviceId)
          );
        }
      } catch (e) {}
    };

    window.addEventListener("resize", onRes);
    onRes();
    checkCameras();
  }, []);

  return (
    <section className="app ">
      <div className="app__view ">
        {settings.camSrc === null && (
          <div className="app__label">
            <span>
              click to choose an image
              {cameras.length > 0 && " or select a cam source"}
            </span>
          </div>
        )}
        <Glcanvas
          onInit={setCanvas}
          settings={settings}
          onRenderStateChange={setIsRendering}
        />
        <Settings
          onSaveImage={onSaveImage}
          onChange={setSettings}
          defaultValues={settings}
          saveEnabled={isRendering}
          cameras={cameras}
        />
      </div>
      {isPhone.current && isLandscape && (
        <div className="app__forcerotate">
          <span>portrait plz</span>
        </div>
      )}
    </section>
  );
}

export default App;
