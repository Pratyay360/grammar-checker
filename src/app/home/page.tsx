"use client"
import React from "react"
import { useState, useEffect } from "react"
import 'dotenv/config'
import { Toaster, toast } from 'sonner'

import './style.css'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

export default function Grammar() {
    const API = process.env.NEXT_PUBLIC_API!

    async function rewriteSentence() {
        // console.log(API)
        const genAI = new GoogleGenerativeAI(API);
        const MODEL_NAME = "gemini-pro";
        const generationConfig = {
            temperature: 0.45,
            candidateCount: 1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
        };
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        let input = document.getElementById("input") as HTMLInputElement
        let text = input.value || ''
        if (text.length == 0) {
            toast.error("Please enter a sentence to rewrite")
        } else {
            sessionStorage.setItem("oldSentence", text)
            const parts = [
                { text: "rewrite this sentence like a pro : " + text },
            ];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings,
            });
            // candidates[0].content.parts[0].text

            const response = result.response;
            let a = Array.isArray(response) ? response[0]?.candidates?.[0]?.content?.parts?.[0]?.text : response?.candidates?.[0]?.content?.parts?.[0]?.text
            input.value = a.replace(/"/g, '')
            input.value = a.replace(/,"/g, '')
            toast.success("Rewritten successfully")
        }
    }
    async function grammarCheck() {
        // console.log(API)
        const genAI = new GoogleGenerativeAI(API);
        const MODEL_NAME = "gemini-pro";
        const generationConfig = {
            temperature: 0.45,
            candidateCount: 1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
        };
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        let input = document.getElementById("input") as HTMLInputElement
        let text = input.value || ''
        if (text.length == 0) {
            toast.error("Please enter a sentence to check")
        } else {
            sessionStorage.setItem("oldSentence", text)
            const parts = [
                { text: "make this sentence grammatically correct : " + text },
            ];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings,
            });
            // candidates[0].content.parts[0].text

            const response = result.response;
            let a = Array.isArray(response) ? response[0]?.candidates?.[0]?.content?.parts?.[0]?.text : response?.candidates?.[0]?.content?.parts?.[0]?.text
            input.value = a.replace(/"/g, '')
            input.value = a.replace(/,"/g, '')
            toast.success("Corrected successfully")
        }
    }
    async function replacePrevious() {
        let input = document.getElementById("input") as HTMLInputElement
        let old = sessionStorage.getItem("oldSentence")
        if ((old?.length ?? 0) > 0) {
            // console.log(old)
            input.value = old as string
            toast.success("Replaced successfully")
        }
        else {
            toast.error("No previous sentence found")
        }
    }
    function copy() {
        let input = document.getElementById("input") as HTMLInputElement
        // input.select()
        let a = input.value
        if (a.length > 0) {
            navigator.clipboard.writeText(a).then(async function () {
                toast.success("Copied successfully")
            })
        }
        else {
            toast.error("No text to copy")
        }
    }


    return (
        <>
            <div className="flex flex-wrap items-center justify-center center mt-10 m-20 p-2">
                <textarea className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl" id="input" placeholder="Enter Sentence Here..." rows={10} cols={20} />
            </div>
            <div className="flex flex-wrap items-center justify-center center gap-5">
                <button onClick={grammarCheck} id="correction" className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2">Grammar Correction</button>
                <button onClick={rewriteSentence} id="rewrite" className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2">Rewrite Sentence</button>
                <button onClick={replacePrevious} id="replace" className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2">Replace Previous</button>
                <button onClick={copy} id="cpy" className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2">Copy</button>
            </div>

            <Toaster richColors closeButton position="bottom-right" expand={false} />        

        </>
    )
}