import React, { useState } from "react";
import QRCode from "qrcode";

export default function QREncoder() {
  function encode(text: string) {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;

    if (text === "") {
      const context = canvas?.getContext("2d");
      context?.clearRect(0, 0, canvas!.width, canvas!.height);
      return;
    }

    QRCode.toCanvas(canvas, text, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
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
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}
