import React, { useState } from "react";

export default function BinaryDecoder() {
  let [decodedText, setDecodedText] = useState("");

  function decode(text: string) {
    let output = "";

    text = text.replace(/🦐/g, "1");
    text = text.replace(/🍤/g, "0");

    let textSplit = text.split(" ");

    for (let c of textSplit) {
      output += String.fromCharCode(parseInt(c, 2));
    }

    setDecodedText(output);
  }

  return (
    <div className="flex flex-row flex-1 overflow-y-auto">
      <textarea
        id="input-text"
        className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none"
        placeholder="Write your text to en-shrimp here..."
        onChange={(e) => {
          decode(e.target.value);
        }}
      ></textarea>

      <div className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
        {decodedText}
      </div>
    </div>
  );
}
