import React, { useState } from "react";
import QRCode from "qrcode";

export default function QREncoder() {
  let [qrcode, setQrcode] = useState<any>();

  let canvasSize = 450;

  function encode(text: string) {
    let canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    ctx!.letterSpacing = "-1px";

    ctx!.clearRect(0, 0, canvasSize, canvasSize);

    if (text === "") {
      setQrcode(null);
      return;
    }

    setQrcode(QRCode.create(text, { errorCorrectionLevel: "H" }));

    let lineH = canvasSize / qrcode.modules.size;

    ctx!.font = lineH + "px Arial";

    for (let y = 0; y < qrcode.modules.size; y++) {
      for (let x = 0; x < qrcode.modules.size; x++) {
        ctx!.fillText(
          qrcode.modules.get(x, y) ? "🦐" : "⬜",
          lineH * x,
          lineH * (y + 1),
          canvasSize
        );
      }
    }
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
        <canvas id="qrCanvas" width={canvasSize} height={canvasSize}>
          <p>Your browser does not support canvas.</p>
        </canvas>
      </div>
    </div>
  );
}
