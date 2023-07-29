import React, { useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const InterviewPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputAnswerValue, setInputAnswerValue] = useState<string>("");
    const [generating, setGenerating] = useState<boolean>(false);
    const generatedTextRef = useRef<HTMLDivElement | null>(null);
    const controllerRef = useRef<AbortController | null>(null);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    const handleInputBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        if (e.target.value) {
            setBtnDisabled(false);
        }
        setInputValue(e.target.value);
    };

    const handleAnswerInputBox= (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        if (e.target.value) {
            setBtnDisabled(false);
        }
        setInputAnswerValue(e.target.value);
    };

    const handleAnswer=async()=>{
        let inputVal={
            inputAnswerValue
        }
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify(inputVal),
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenerate = async () => {
        setGenerating(true);
        generatedTextRef.current!.innerText = "Exploring...";

        const controller = new AbortController();
        controllerRef.current = controller;
        const signal = controller.signal;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-16k-0613",
                    messages: [{ role: "user", content: inputValue }],
                    max_tokens: 2000,
                    stream: true,
                }),
                signal,
            });

            const reader = await response.body!.getReader();
            const decoder = new TextDecoder("utf-8");
            generatedTextRef.current!.innerText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");
                const parsedLines = lines
                    .map((line) => line.replace(/^data: /, "").trim())
                    .filter((line) => line !== "" && line !== "[DONE]")
                    .map((line) => {
                        try {
                            return JSON.parse(line);
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                            return error;
                        }
                    });

                for (const parsedLine of parsedLines) {
                    if (!parsedLine || !parsedLine.choices || !parsedLine.choices.length) {
                        continue;
                    }

                    const { choices } = parsedLine;
                    const { delta } = choices[0];
                    const { content } = delta;
                    if (content) {
                        generatedTextRef.current!.innerText += content;
                    }
                }
            }
        } catch (error) {
            if (signal.aborted) {
                generatedTextRef.current!.innerText = "Request aborted.";
            } else {
                console.error("Error:", error);
                generatedTextRef.current!.innerText = "Error occurred while generating.";
            }
        } finally {
            setGenerating(false);
            controllerRef.current = null;
        }
    };


    const handleStopGenerating = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    };

    return (

        <div className="h-4/4 m-2 bg-blue-50 flex-none w-4/4 ">
            <div className="flex-none lg:w-1/4 lg:h-14 sm:w-0 sm:h-0 z-10">
                <Sidebar />
            </div>
            <div className="fixed top-0 right-5 bg-indigo-600 py-2 w-3/4 z-10 px-2 rounded">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputBox}
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-lg my-5"
                    aria-label="Filter projects"
                    placeholder="Just Ask..."
                />
                <div className="flex gap-10 mx-5">
                    <button
                        className="block w-full text-sm text-white color-black rounded-full border-2 border-white border-black w-2/5 m-auto h-10 bg-indigo-600 align-middle hover:bg-indigo-500"
                        onClick={handleGenerate}
                        disabled={generating || btnDisabled}
                    >
                        <div className="flex justify-center gap-10">
                            <h3>
                                {generating ? 'Generating...' : 'Send'}
                            </h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </button>
                    <button
                        className="block w-full text-sm text-white color-black rounded-full border-2 border-black w-2/5 m-auto h-10 bg-indigo-600 align-middle scroll-pr-px-10 hover:bg-indigo-500 border-white"
                        onClick={handleStopGenerating}
                        disabled={!generating}
                    >
                        <div className="flex justify-center sm:justify-space-around gap-10">
                            <h3>Stop Generating</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div ref={generatedTextRef} className="w-5rem my-24 snap-proximity snap-y h-screen border-2 text-lime-800 text-sm w-3/4 right-5 absolute hover:absolute rounded-[12px]">

            </div>
            <div className="flex fixed bottom-0 right-5 w-3/4 gap-5 bg-indigo-600 rounded">
                <input
                    type="text"
                    value={inputAnswerValue}
                    onChange={handleAnswerInputBox}
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-3/4 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-lg my-5 mx-5"
                    aria-label="Filter projects"
                    placeholder="Write you answer here..."
                />
                <button className="flex text-white m-auto border-2 rounded p-1 hover:bg-white hover:text-black" onClick={handleAnswer}><h3>Send</h3><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 color-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                </button>
            </div>
        </div>
    );
};

export default InterviewPage;




