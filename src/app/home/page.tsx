"use client"
import React from "react"
import { useState, useEffect } from "react"
import 'dotenv/config'
import './style.css'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

export default function Grammar() {
    const API = process.env.NEXT_PUBLIC_API 

    async function messageShow(s: string) {
        let message = document.getElementById(s) as HTMLElement
        message.style.display = "block";
        await new Promise(r => setTimeout(r, 2000));
        message.style.display = "none";
    }
    async function rewriteSentence() {
        // console.log(API)
        const genAI = new GoogleGenerativeAI(API);
        const MODEL_NAME = "gemini-pro";
        const generationConfig = {
            temperature: 0.45,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        let input = document.getElementById("input") as HTMLElement
        let text = input.value || ''
        if (text.length == 0) {
            messageShow("altererr");
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
            input.value = a
            messageShow("changed")
        }
    }
    async function grammarCheck() {
        // console.log(API)
        const genAI = new GoogleGenerativeAI(API);
        const MODEL_NAME = "gemini-pro";
        const generationConfig = {
            temperature: 0.45,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        let input = document.getElementById("input") as HTMLElement
        let text = input.value || ''
        if (text.length == 0) {
            messageShow("altererr");
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
            input.value = a
            messageShow("changed")
        }
    }
    async function replacePrevious() {
        let input = document.getElementById("input") as HTMLInputElement
        let old = sessionStorage.getItem("oldSentence")
        if ((old?.length ?? 0) > 0) {
            // console.log(old)
            input.value = old as string
            messageShow("changed")
        }
        else {
            messageShow("copynotice")
        }
    }
    function copy() {
        let input = document.getElementById("input") as HTMLInputElement
        // input.select()
        let a = input.value
        if (a.length > 0) {
            navigator.clipboard.writeText(a).then(async function () {
                messageShow("success");
            })
        }
        else {
            messageShow("copynotice")
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





            {/* Alerts */}
            <div className="m-5 p-10">
                <div className="items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert" id="success">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Copied !!!</span>
                    </div>
                </div>
                <div className="items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert" id="changed">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Changed</span>
                    </div>
                </div>
                <div className=" items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert" id="copynotice">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium"> No sentence to replace / copy</span>
                    </div>
                </div>
                <div className="items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert" id="altererr">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium"> No String to alter</span>
                    </div>
                </div>

            </div>

        </>
    )
}