"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Grammar() {
  const [inputText, setInputText] = useState<string>("");
  const [previousText, setPreviousText] = useState<string>("");

  // Load previous text from sessionStorage on component mount
  useEffect(() => {
    const savedPrevious = sessionStorage.getItem("oldSentence");
    if (savedPrevious) {
      setPreviousText(savedPrevious);
    }
  }, []);

  const updateInputAndSavePrevious = (newText: string) => {
    setPreviousText(inputText);
    sessionStorage.setItem("oldSentence", inputText);
    setInputText(newText);
  };

  const handleRewrite = async () => {
    if (inputText.trim().length === 0) {
      toast.error("Please enter a sentence to rewrite");
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          "rewrite this sentence like a pro (GIVE ONLY 1 RESPONSE) : " + inputText
        ),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const newText = await response.text();
      updateInputAndSavePrevious(newText);
      toast.success("Rewritten successfully");
    } catch (error) {
      console.error("Error rewriting sentence:", error);
      toast.error("Failed to rewrite sentence. Please try again.");
    }
  };

  const handleSummarize = async () => {
    if (inputText.trim().length === 0) {
      toast.error("Please enter a sentence to summarize");
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          "summarize this sentence like a pro (GIVE ONLY 1 RESPONSE) : " + inputText
        ),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const newText = await response.text();
      updateInputAndSavePrevious(newText);
      toast.success("Summarized successfully");
    } catch (error) {
      console.error("Error summarizing sentence:", error);
      toast.error("Failed to summarize sentence. Please try again.");
    }
  };

  const handleGrammarCheck = async () => {
    if (inputText.trim().length === 0) {
      toast.error("Please enter a sentence to check grammar");
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          "make this sentence grammatically correct like a pro (GIVE ONLY 1 RESPONSE) : " +
            inputText
        ),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const newText = await response.text();
      updateInputAndSavePrevious(newText);
      toast.success("Corrected successfully");
    } catch (error) {
      console.error("Error checking grammar:", error);
      toast.error("Failed to check grammar. Please try again.");
    }
  };

  const handleReplacePrevious = () => {
    if (previousText.length > 0) {
      setInputText(previousText);
      toast.success("Replaced successfully");
    } else {
      toast.error("No previous sentence found");
    }
  };

  const handleCopy = () => {
    if (inputText.length > 0) {
      navigator.clipboard.writeText(inputText).then(() => {
        toast.success("Copied successfully");
      }).catch(() => {
        toast.error("Failed to copy text");
      });
    } else {
      toast.error("No text to copy");
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center center mt-10 m-20 p-2">
        <textarea
          className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl"
          id="input"
          placeholder="Enter Sentence Here..."
          rows={10}
          cols={20}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center center gap-5">
        <button
          onClick={handleGrammarCheck}
          id="grammar-correction"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Grammar Correction
        </button>
        <button
          onClick={handleRewrite}
          id="rewrite"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Rephrase Sentence
        </button>
        <button
          onClick={handleSummarize}
          id="summarize"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Summarize Text
        </button>
        <button
          onClick={handleReplacePrevious}
          id="replace"
          className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2"
        >
          Replace Previous
        </button>
        <button
          onClick={handleCopy}
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
