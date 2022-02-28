import { useEffect, useRef, useState } from "react";

function Camsrc({ src, onPixelSrc }) {
  const vRef = useRef();
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    //react-hooks/exhaustive-deps
    const vrefCurrent = vRef.current;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: { exact: src },
        },
      })
      .then(
        (stream) => {
          vrefCurrent.srcObject = stream;
        },
        (err) => {
          if (
            !alertShown &&
            navigator.userAgent.match(/(android.*chrome)|(chrome.*android)/gi)
          ) {
            alert(
              `Chrome bug on older Android versions, please try switching camera again\n :( `
            );
            setAlertShown(true);
          }
        }
      );

    return () => {
      if (vrefCurrent.srcObject) {
        const tracks = vrefCurrent.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
        vrefCurrent.srcObject = null;
      }
    };
  }, [src, alertShown]);

  const onCanPlay = (e) => {
    onPixelSrc(vRef.current);
  };

  return (
    <video
      style={{ opacity: 0 }}
      playsInline
      onPlaying={onCanPlay}
      ref={vRef}
      autoPlay={true}
    ></video>
  );
}

export default Camsrc;
