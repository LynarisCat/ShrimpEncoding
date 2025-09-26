import React, { useState } from "react";
import QRCode from "qrcode";

export default function QREncoder() {
  let [qrcode, setQrcode] = useState<any>();
  let [errorCorrection, setErrorCorrection] =
    useState<QRCode.QRCodeErrorCorrectionLevel>("L");

  const errorLevels = ["L", "M", "Q", "H"];

  const canvasSize = 450;

  function encode(text: string) {
    const canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx!.clearRect(0, 0, canvasSize, canvasSize);

    if (text === "") {
      setQrcode(null);
      return;
    }

    let qr = QRCode.create(text, { errorCorrectionLevel: errorCorrection });

    setQrcode(qr);

    let lineH = canvasSize / qr.modules.size;

    ctx!.font = lineH + "px Arial";

    for (let y = 0; y < qr.modules.size; y++) {
      for (let x = 0; x < qr.modules.size; x++) {
        ctx!.fillText(
          qr.modules.get(x, y) ? "🦐" : "⬜",
          lineH * x,
          lineH * (y + 1),
          canvasSize
        );
      }
    }
  }

  function downloadImg() {
    const canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = img;
    link.setAttribute("download", `QR_Shrimp.png`);

    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link);
  }

  return (
    <div className="flex flex-row flex-1 overflow-y-auto">
      <div className="overflow-auto p-2.5 m-5 flex-1 flex flex-col">
        <textarea
          id="input-text"
          className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none"
          placeholder="Write your text to en-shrimp here..."
          onChange={(e) => {
            encode(e.target.value);
          }}
        ></textarea>

        <label
          htmlFor="error-correct-slider"
          className="block mb-2 text-sm font-medium text-white"
        >
          Error correction level
        </label>
        <input
          id="error-correct-slider"
          type="range"
          min="0"
          max="3"
          value={errorLevels.indexOf(errorCorrection)}
          className="w-full h-2 rounded-lg cursor-pointer bg-gray-700"
          onChange={(e) => {
            setErrorCorrection(
              errorLevels[
                e.target.valueAsNumber
              ] as QRCode.QRCodeErrorCorrectionLevel
            );
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            encode(textAreaInp.value);
          }}
        />
      </div>

      <div className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white flex flex-col items-center">
        <canvas
          id="qrCanvas"
          width={canvasSize}
          height={canvasSize}
          className="h-fit w-fit"
        >
          <p>Your browser does not support canvas.</p>
        </canvas>

        <button
          className="bg-green-600 p-2 m-2 w-fit h-fit rounded-lg text-white font-bold hover:bg-green-700 cursor-pointer"
          onClick={(e) => {
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            encode(textAreaInp.value);
            downloadImg();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
