import { useEffect, useRef } from "react";
import * as twgl from "twgl-base.js";
import { vert, frag } from "./shaders";
import "./glcanvas.scss";
import Upload from "components/upload/Upload";
import Camsrc from "components/camsrc/Camsrc";

function Glcanvas({ onInit, settings, onRenderStateChange }) {
  const controller = useRef();
  const stage = useRef();

  useEffect(() => {
    if (!controller.current) return;
    controller.current.setFiltersize(settings.filterSize);
  }, [settings.filterSize]);

  useEffect(() => {
    if (!controller.current) return;
    //reset src
    controller.current.setPixelSrc(null);
  }, [settings.camSrc]);

  const onPixelSrc = (src) => {
    if (!controller.current) return;

    controller.current.setFiltersize(settings.filterSize);
    controller.current.setPixelSrc(src);

    onRenderStateChange(true);
  };

  useEffect(() => {
    let sw,
      sh,
      tw,
      th,
      texture,
      pixelSrc,
      raf,
      _filterSize = 4;

    const gl = stage.current.getContext("webgl", {
      preserveDrawingBuffer: true,
    });

    const programInfo = twgl.createProgramInfo(gl, [vert, frag]);

    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };

    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

    const render = () => {
      const tr = tw / th;

      let res;
      if (tr > sw / sh) {
        res = [sh * (tw / th), sh];
      } else {
        res = [sw, sw * (1 / tr)];
      }

      if (pixelSrc.tagName === "VIDEO" && pixelSrc.srcObject) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          pixelSrc
        );
      }

      const uniforms = {
        diffuse: texture,
        resolution: res,
        fxsize: _filterSize,
        offset: [(res[0] - sw) / 2, (res[1] - sh) / 2],
      };

      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);

      if (pixelSrc.tagName === "VIDEO" && pixelSrc.srcObject) {
        raf = requestAnimationFrame(render);
      }
    };
    const onRes = () => {
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      sw = gl.canvas.width;
      sh = gl.canvas.height;

      if (!raf && texture) render();
    };

    window.addEventListener("resize", onRes);
    onRes();

    const setPixelSrc = (ps) => {
      if (ps) {
        pixelSrc = ps;
        if (ps.tagName === "IMG") {
          texture = twgl.createTexture(gl, {
            src: ps,
            flipY: true,
          });
          tw = ps.naturalWidth;
          th = ps.naturalHeight;
          render();
        } else {
          texture = twgl.createTexture(gl, {
            src: [0, 0, 255],
            format: gl.RGB,
            min: gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            flipY: true,
          });
          tw = ps.videoWidth;
          th = ps.videoHeight;

          if (!raf) {
            raf = requestAnimationFrame(render);
          } else {
          }
        }
      } else {
        texture = tw = th = pixelSrc = null;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
        gl.clear(gl.COLOR_BUFFER_BIT);
        onRenderStateChange(false);
      }
    };

    const setFiltersize = (size) => {
      _filterSize = size;
      if (!raf && texture) {
        render();
      }
    };

    controller.current = { setPixelSrc, setFiltersize };
  }, [onRenderStateChange]);

  useEffect(() => {
    onInit(stage.current);
  }, [onInit]);

  return (
    <div className="glcanvas">
      <canvas className="glcanvas__stage" ref={stage}></canvas>
      {settings.camSrc !== null ? (
        <Camsrc src={settings.camSrc} onPixelSrc={onPixelSrc} />
      ) : (
        <Upload onPixelSrc={onPixelSrc} />
      )}
    </div>
  );
}

export default Glcanvas;
