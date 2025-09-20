import React, { useState } from "react";

export default function Binary() {

    let [encodedText, setEncodedText] = useState("");


    function encode(text: string) {

        let output = "";

        for (let c of text) {
            output += c.charCodeAt(0).toString(2) + " ";
        }

        output = output.replace(/1/g, "🦐");
        output = output.replace(/0/g, "🍤");

        setEncodedText(output);
    }

    return (
        <div className="flex flex-row flex-1">
            <textarea
                id="input-text"
                className="block p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white resize-none"
                placeholder="Write your text to en-shrimp here..."
                onChange={(e) => { encode(e.target.value) }}></textarea>

            <div
                className="block p-2.5 m-5 flex-1 text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            >
                {encodedText}
            </div>
        </div>
    );

};