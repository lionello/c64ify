import { fileTypeFromBlob } from "file-type/core";

import "./upload.scss";

function Upload({ onPixelSrc }) {
  const onChange = (e) => {
    if (e.target.files.length === 1) {
      fileTypeFromBlob(e.target.files[0]).then((res) => {
        if (res.mime === "image/jpeg" || res.mime === "image/png") {
          const fr = new FileReader();
          fr.readAsDataURL(e.target.files[0]);
          fr.addEventListener(
            "load",
            () => {
              //preload image so that texture will have a size
              const img = document.createElement("img");
              img.onload = () => {
                onPixelSrc(img);
              };
              img.setAttribute("src", fr.result);
            },
            false
          );
        } else {
          alert("IMAGE FILE REQUIRED");
        }
      });
    }
  };

  return <input className="upload" type="file" onChange={onChange} />;
}

export default Upload;
