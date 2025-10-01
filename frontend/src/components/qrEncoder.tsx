import React, { useState } from "react";
import QRCode from "qrcode";

export default function QREncoder() {
  let [errorCorrection, setErrorCorrection] =
    useState<QRCode.QRCodeErrorCorrectionLevel>("H");
  const canvasSize = 600;

  const errorLevels = ["L", "M", "Q", "H"];

  function encode(text: string, errorLevel: QRCode.QRCodeErrorCorrectionLevel) {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx!.clearRect(0, 0, canvasSize, canvasSize);

    let qr = QRCode.create(text, { errorCorrectionLevel: errorLevel });

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
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = img;
    link.setAttribute("download", `QR_Shrimp.png`);

    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link);
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-y-auto h-full">
      <div className="overflow-auto p-2.5 m-5 flex-1 flex flex-col min-h-[200px]">
        <textarea
          id="input-text"
          className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none"
          placeholder="Write your text to en-shrimp here..."
          onChange={(e) => {
            encode(e.target.value, errorCorrection);
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
            let newErrLvl = errorLevels[
              e.target.valueAsNumber
            ] as QRCode.QRCodeErrorCorrectionLevel;
            setErrorCorrection(newErrLvl);
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            encode(textAreaInp.value, newErrLvl);
          }}
        />
      </div>

      <div className="m-5 flex-1 flex flex-col justify-center items-center">
        <div
          id="qr-container"
          className="aspect-square flex overflow-auto m-2 max-h-[40vh] md:max-h-max md:h-auto text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white items-center justify-center"
        >
          <canvas
            id="qr-canvas"
            width={canvasSize}
            height={canvasSize}
            className="w-full max-w-8/9 h-auto object-contain m-auto"
          >
            <p>Your browser does not support canvas.</p>
          </canvas>
        </div>
        <button
          className="bg-green-600 p-2 m-2 w-fit h-fit rounded-lg text-white font-bold hover:bg-green-700 cursor-pointer"
          onClick={(e) => {
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            encode(textAreaInp.value, errorCorrection);
            downloadImg();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
