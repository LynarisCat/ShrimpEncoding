import React, { useState, useEffect } from "react";
import {
  binEncInput,
  binEncOutput,
  binDecInput,
  binDecOutput,
  morEncInput,
  morEncOutput,
  morDecInput,
  morDecOutput,
} from "../store";
import type { PreinitializedWritableAtom } from "nanostores";

export default function BinaryEncoder({
  decoding,
  codingType,
}: Readonly<{ decoding: boolean; codingType: string }>) {
  let inputTxt: PreinitializedWritableAtom<string> & object;
  let outputTxt: PreinitializedWritableAtom<string> & object;

  let encode: (text: string) => void;
  let decode: (text: string) => void;

  if (decoding) {
    switch (codingType) {
      case "binary":
        inputTxt = binDecInput;
        outputTxt = binDecOutput;
        decode = decodeBin;
        break;
      case "morse":
        inputTxt = morDecInput;
        outputTxt = morDecOutput;
        decode = decodeMor;
        break;
    }
  } else {
    switch (codingType) {
      case "binary":
        inputTxt = binEncInput;
        outputTxt = binEncOutput;
        encode = encodeBin;
        break;
      case "morse":
        inputTxt = morEncInput;
        outputTxt = morEncOutput;
        encode = encodeMor;
        break;
    }
  }

  let [codedText, setcodedText] = useState("");

  useEffect(() => {
    let textAreaInp = document.getElementById(
      "input-text"
    ) as HTMLTextAreaElement;

    textAreaInp.value = inputTxt.get();
    setcodedText(outputTxt.get());
  }, []);

  // Binary ------------------------------------------------
  function encodeBin(text: string) {
    let output = "";

    for (let c of text) {
      output += c.charCodeAt(0).toString(2) + " ";
    }

    output = output.replace(/1/g, "🦐");
    output = output.replace(/0/g, "🍤");

    setcodedText(output);

    inputTxt.set(text);
    outputTxt.set(codedText);
  }

  function decodeBin(text: string) {
    let output = "";
    inputTxt.set(text);

    text = text.replace(/🦐/g, "1");
    text = text.replace(/🍤/g, "0");

    let textSplit = text.split(" ");

    for (let c of textSplit) {
      output += String.fromCharCode(parseInt(c, 2));
    }

    setcodedText(output);

    outputTxt.set(output);
  }

  // Morse ------------------------------------------------

  let morseAlphabet: { [id: string]: string } = {
    a: "🦐🍤",
    b: "🍤🦐🦐🦐",
    c: "🍤🦐🍤🦐",
    d: "🍤🦐🦐",
    e: "🦐",
    f: "🦐🦐🍤🦐",
    g: "🍤🍤🦐",
    h: "🦐🦐🦐🦐",
    i: "🦐🦐",
    j: "🦐🍤🍤🍤",
    k: "🍤🦐🍤",
    l: "🦐🍤🦐🦐",
    m: "🍤🍤",
    n: "🍤🦐",
    o: "🍤🍤🍤",
    p: "🦐🍤🍤🦐",
    q: "🍤🍤🦐🍤",
    r: "🦐🍤🦐",
    s: "🦐🦐🦐",
    t: "🍤",
    u: "🦐🦐🍤",
    v: "🦐🦐🦐🍤",
    w: "🦐🍤🍤",
    x: "🍤🦐🦐🍤",
    y: "🍤🦐🍤🍤",
    z: "🍤🍤🦐🦐",
    " ": "🌊",
    "1": "🦐🍤🍤🍤🍤",
    "2": "🦐🦐🍤🍤🍤",
    "3": "🦐🦐🦐🍤🍤",
    "4": "🦐🦐🦐🦐🍤",
    "5": "🦐🦐🦐🦐🦐",
    "6": "🍤🦐🦐🦐🦐",
    "7": "🍤🍤🦐🦐🦐",
    "8": "🍤🍤🍤🦐🦐",
    "9": "🍤🍤🍤🍤🦐",
    "0": "🍤🍤🍤🍤🍤",
  };

  const reverseMorseAlphabet: { [code: string]: string } = Object.fromEntries(
    Object.entries(morseAlphabet).map(([char, code]) => [code, char])
  );

  function encodeMor(text: string) {
    inputTxt.set(text);

    let output = text
      .split("")
      .map(function (e) {
        return morseAlphabet[e.toLowerCase()] || "";
      })
      .join(" ")
      .replace(/ +/g, " ");

    setcodedText(output);

    outputTxt.set(codedText);
  }

  function decodeMor(text: string) {
    inputTxt.set(text);

    let output = text
      .split(" ")
      .map((code) => reverseMorseAlphabet[code] || "")
      .join("");

    setcodedText(output);

    outputTxt.set(output);
  }

  // ------------------------------------------------------
  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
      <textarea
        id="input-text"
        className="overflow-auto p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none min-h-40"
        placeholder="Write your text to en-shrimp here..."
        onChange={(e) => {
          decoding ? decode(e.target.value) : encode(e.target.value);
        }}
      ></textarea>

      <div className="m-5 flex-1 flex flex-col justify-center items-center">
        <div className="overflow-auto p-2.5 m-2 flex-1 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
          {codedText}
        </div>
        <button
          className="bg-green-600 p-2 m-2 w-fit h-fit rounded-lg text-white font-bold hover:bg-green-700 cursor-pointer"
          onClick={(e) => {
            let textAreaInp = document.getElementById(
              "input-text"
            ) as HTMLTextAreaElement;
            decoding ? decode(textAreaInp.value) : encode(textAreaInp.value);
            navigator.clipboard.writeText(codedText);
          }}
        >
          copy
        </button>
      </div>
    </div>
  );
}
