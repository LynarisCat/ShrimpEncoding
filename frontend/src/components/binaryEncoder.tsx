import React, { useState, useEffect } from "react";
import { binEncInput, binEncOutput } from "../store";

export default function BinaryEncoder() {
  let [encodedText, setEncodedText] = useState("");

  useEffect(() => {
    let textAreaInp = document.getElementById(
      "input-text"
    ) as HTMLTextAreaElement;

    textAreaInp.value = binEncInput.get();
    setEncodedText(binEncOutput.get());
  }, []);

  function encode(text: string) {
    let output = "";

    for (let c of text) {
      output += c.charCodeAt(0).toString(2) + " ";
    }

    output = output.replace(/1/g, "🦐");
    output = output.replace(/0/g, "🍤");

    setEncodedText(output);

    binEncInput.set(text);
    binEncOutput.set(encodedText);
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

      <div className="m-5 flex-1 flex flex-col justify-center items-center">
        <div className="overflow-auto p-2.5 m-2 flex-1 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
          {encodedText}
        </div>
        <button
          className="bg-green-600 p-2 m-2 w-fit h-fit rounded-lg text-white font-bold hover:bg-green-700 cursor-pointer"
          onClick={(e) => {
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            encode(textAreaInp.value);
            navigator.clipboard.writeText(encodedText);
          }}
        >
          copy
        </button>
      </div>
    </div>
  );
}
