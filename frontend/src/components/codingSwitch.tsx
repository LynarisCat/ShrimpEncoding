import React, { useState, useEffect } from "react";
import BinaryDecoder from "./binaryDecoder";
import BinaryEncoder from "./binaryEncoder";
import QREncoder from "./qrEncoder";

import { encoding } from "../store";

export default function CodingSwitch() {
  let [decoding, setDecoding] = useState(false);
  let [switching, setSwitching] = useState(false);
  let [coding, setCoding] = useState("");

  encoding.listen((value) => {
    setCoding(value);
  });

  useEffect(() => {
    setSwitching(coding === "binary");

    if (coding === "qr") {
      setDecoding(false);
    }
  }, [coding]);

  function coder() {
    if (coding === "binary") {
      return decoding ? <BinaryDecoder /> : <BinaryEncoder />;
    } else if (coding === "qr") {
      return <QREncoder />;
    }

    return <div>Select an encoding type.</div>;
  }

  return (
    <>
      {switching ? (
        <div className="flex items-center m-auto mt-5 select-none">
          <label
            htmlFor="switch"
            className="relative inline-block w-50 h-8 cursor-pointer"
          >
            <input
              type="checkbox"
              id="switch"
              className="peer sr-only"
              autoComplete="off"
              onChange={(e) => {
                setDecoding(e.target.checked);
              }}
            />
            <span className="absolute inset-0 rounded-full transition-colors duration-200 ease-in-out bg-amber-700 peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0 -translate-y-1/2 h-8 w-25 rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full bg-white"></span>
            (//Left Text)
            <span className="absolute top-1/2 start-10 -translate-y-1/2 flex justify-center items-center size-5 peer-checked:text-white transition-colors duration-200 text-amber-600">
              ENCODING
            </span>
            (//Right Text)
            <span className="absolute top-1/2 end-10 -translate-y-1/2 flex justify-center items-center size-5 peer-checked:text-blue-600 transition-colors duration-200 text-white">
              DECODING
            </span>
          </label>
        </div>
      ) : (
        <></>
      )}
      {coder()}
    </>
  );
}
