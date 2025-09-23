import React, { useState, type JSX } from "react";
import QRCode from "qrcode";

export default function QREncoder() {
  let [qrcode, setQrcode] = useState<any>();

  function encode(text: string) {
    if (text === "") {
      setQrcode(null);
    }

    setQrcode(QRCode.create(text, { errorCorrectionLevel: "H" }));
  }

  function getQRCode() {
    const divs: JSX.Element[] = [];

    if (!qrcode) {
      console.log(qrcode);
      return divs;
    }

    for (let y = 0; y < qrcode.modules.size; y++) {
      for (let x = 0; x < qrcode.modules.size; x++) {
        console.log(qrcode.modules.size);

        divs.push(
          <div key={`${x}-${y}`} style={{ textAlign: "center" }}>
            {qrcode.modules.get(x, y) ? "🦐" : "⬜"}
          </div>
        );
      }
    }

    return divs;
  }

  return (
    <div className="flex flex-row flex-1 overflow-y-auto">
      <textarea
        id="input-text"
        className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none test"
        placeholder="Write your text to en-shrimp here..."
        onChange={(e) => {
          encode(e.target.value);
        }}
      ></textarea>

      <div className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${
              qrcode ? qrcode.modules.size : 0
            }, 1em)`,
            lineHeight: "1em",
            fontSize: "1em",
          }}
        >
          {getQRCode()}
        </div>
      </div>
    </div>
  );
}
