import { useEffect, useState } from "react";
import Button from "./Button";
import "./settings.scss";

function Settings({
  onSaveImage,
  onChange,
  defaultValues,
  saveEnabled,
  cameras,
}) {
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return (
    <div className="settings">
      <div className="settings__row settings__row--top">
        <div>
          <span className="settings__label">source:</span>
          <Button
            disabled={values.camSrc === null}
            onClick={() => {
              setValues((_values) => ({ ..._values, ...{ camSrc: null } }));
            }}
            label="pic"
          ></Button>
          {cameras.map((cam, i) => (
            <Button
              key={cam}
              disabled={values.camSrc === cam}
              onClick={() => {
                setValues((_values) => ({ ..._values, ...{ camSrc: cam } }));
              }}
              label={`cam${i}`}
            ></Button>
          ))}
        </div>
        <div>
          <span className="settings__label">fxsize:</span>
          {[4, 8, 12].map((v) => (
            <Button
              key={v}
              disabled={values.filterSize === v}
              onClick={() => {
                setValues((_values) => ({ ..._values, ...{ filterSize: v } }));
              }}
              label={v}
            ></Button>
          ))}
          <Button
            disabled={!saveEnabled}
            onClick={onSaveImage}
            label="save"
            type="save"
          ></Button>
        </div>
      </div>
      <div className="settings__row settings__row--bottom">
        <div>
          <Button
            onClick={() => {
              window.open("https://github.com/jurito/c64ify");
            }}
            label="github"
            type="link"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
