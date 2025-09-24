import React, { useState, useEffect } from "react";
import { binDecInput, binDecOutput } from "../store";

export default function BinaryDecoder() {
  let [decodedText, setDecodedText] = useState("");

  useEffect(() => {
    let textAreaInp = document.getElementById(
      "input-text"
    ) as HTMLTextAreaElement;

    textAreaInp.value = binDecInput.get();
    setDecodedText(binDecOutput.get());
  }, []);

  function decode(text: string) {
    let output = "";
    binDecInput.set(text);

    text = text.replace(/🦐/g, "1");
    text = text.replace(/🍤/g, "0");

    let textSplit = text.split(" ");

    for (let c of textSplit) {
      output += String.fromCharCode(parseInt(c, 2));
    }

    setDecodedText(output);

    binDecOutput.set(output);
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
