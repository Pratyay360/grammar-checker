"use client";
import React from "react";
import { Toaster, toast } from "sonner";

async function rewriteSentence() {
  let input = document.getElementById("input") as HTMLInputElement;
  let text = input.value || "";
  if (text.length == 0) {
    toast.error("Please enter a sentence to rewrite");
  } else {
    sessionStorage.setItem("oldSentence", text);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        "rewrite this sentence like a pro (GIVE ONLY 1 RESPONSE) : " + text
      ),
    });
    input.value = await response.text();
    toast.success("rewritting successfully");
  }
}
async function summarizer() {
  let input = document.getElementById("input") as HTMLInputElement;
  let text = input.value || "";
  if (text.length == 0) {
    toast.error("Please enter a sentence to summarize");
  } else {
    sessionStorage.setItem("oldSentence", text);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        "summarize this sentence like a pro (GIVE ONLY 1 RESPONSE) : " + text
      ),
    });
    input.value = await response.text();
    toast.success("Summarized successfully");
  }
}
async function grammarCheck() {
  // console.log(API)
  let input = document.getElementById("input") as HTMLInputElement;
  let text = input.value || "";
  if (text.length == 0) {
    toast.error("Please enter a sentence to summarize");
  } else {
    sessionStorage.setItem("oldSentence", text);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        "make this sentence grammatically correct like a pro (GIVE ONLY 1 RESPONSE) : " +
          text
      ),
    });
    input.value = await response.text();
    toast.success("Corrected successfully");
  }
}

async function replacePrevious() {
  let input = document.getElementById("input") as HTMLInputElement;
  let old = sessionStorage.getItem("oldSentence");
  if ((old?.length ?? 0) > 0) {
    // console.log(old)
    input.value = old as string;
    toast.success("Replaced successfully");
  } else {
    toast.error("No previous sentence found");
  }
}
function copy() {
  let input = document.getElementById("input") as HTMLInputElement;
  // input.select()
  let a = input.value;
  if (a.length > 0) {
    navigator.clipboard.writeText(a).then(async function () {
      toast.success("Copied successfully");
    });
  } else {
    toast.error("No text to copy");
  }
}

export default function Grammar() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center center mt-10 m-20 p-2">
        <textarea
          className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl"
          id="input"
          placeholder="Enter Sentence Here..."
          rows={10}
          cols={20}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center center gap-5">
        <button
          onClick={grammarCheck}
          id="correction"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Grammar Correction
        </button>
        <button
          onClick={rewriteSentence}
          id="rewrite"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Rephrase Sentence
        </button>
        <button
          onClick={summarizer}
          id="correction"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Summarize Text
        </button>
        <button
          onClick={replacePrevious}
          id="replace"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Replace Previous
        </button>
        <button
          onClick={copy}
          id="cpy"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Copy
        </button>
      </div>

      <Toaster richColors closeButton position="bottom-right" expand={false} />
    </>
  );
}
