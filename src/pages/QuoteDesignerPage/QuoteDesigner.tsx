import { useRef, useState } from 'react';
import '../../styles/quote.css';

import useLocalStorage from '../../hooks/localStorage';

import QuoteAndPromptHistory from './QuoteAndPromptHistory';


import { FaRegCopy } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import LinkToHome from '../../components/LinkToHome';


export default function QuoteDesigner() {
  const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
  const [quote, setQuote] = useLocalStorage<string>('quote', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useLocalStorage<{ id: number; prompt: string; quote: string }[]>('quoteHistory', []);
  const [showHistory, setShowHistory] = useState<boolean>(false);


  const controllerRef = useRef<AbortController | null>(null);

  const historyId = useRef<number>(
    (() => {
      const storedHistoryId = localStorage.getItem('historyId');
      return storedHistoryId ? parseInt(storedHistoryId) : 1;
    })()
  )


  function handleGenerateQuote() {
    if (prompt) {
      setIsLoading(true);
      setError('');
      controllerRef.current = new AbortController();

      // currentlt keep it off, save api calls
      fetch(`https://api.jsongpt.com/json?prompt=${prompt}&quotes=only 1 quote in string format`, {
        signal: controllerRef.current.signal
      })
        .then(response => response.json())
        .then(data => {
          const newQuote = data.quotes;
          setQuote(newQuote);
          setHistory(prev => [{ id: historyId.current++, prompt, quote: newQuote }, ...prev]); // Store prompt and quote
          localStorage.setItem('historyId', historyId.current.toString());
          setIsLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(`Error fetching quotes: ${err}`);
          }
          setIsLoading(false);
        });

    } else {
      setQuote('Stay Inspired!');
    }
  }

  function handlePauseGeneration(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    if (isLoading) {
      controllerRef.current?.abort();
      setIsLoading(false);
    }
  }

  function handleCopyQuote(text: string) {
    navigator.clipboard.writeText(text);
  }



  return (
    <>
      <LinkToHome />

      <div className="custom-st-container min-h-screen px-4 py-12 bg-slate-900 text-white flex flex-col items-center space-y-12">
        {/* Title */}
        <header className="text-center">
          <h1 className="custom-st-header text-4xl md:text-6xl font-bold font-poppins tracking-wide">
            ✍️ QuoteCraft Studio
          </h1>
          <p className="mt-2 text-gray-400 text-lg md:text-xl">
            Style your thoughts. Turn prompts into beautiful quotes.
          </p>
        </header>

        {/* Quote Canvas */}
        <div className="group bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-2xl text-center text-2xl md:text-3xl font-medium italic border border-slate-700 min-h-[150px] flex items-center justify-center relative">
          {!error ? quote : <span className="text-red-400 font-semibold">{error}</span>}
          <button
            className="absolute right-4 bottom-4 sm:text-transparent group-hover:text-white transition active:scale-50"
            aria-label="Copy quote"
            onClick={() => handleCopyQuote(quote)}
            type="button"
          >
            <FaRegCopy />
          </button>
        </div>

        {/* Input & Action */}
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          <input
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your inspiration..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex gap-4 w-full justify-center">
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold flex items-center gap-2"
              onClick={handleGenerateQuote}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2" onClick={handlePauseGeneration}>
                  Generating...
                  <FaStopCircle className="animate-spin" style={{ width: "24px", height: "24px" }} />
                </span>
              ) : (
                'Generate Quote'
              )}
            </button>

            {/* History Button */}
            <button
              className="px-5 py-2 bg-slate-700 hover:bg-slate-600 transition rounded-lg text-white font-semibold flex items-center gap-2"
              onClick={() => setShowHistory(true)}
            >
              <FaHistory /> History
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showHistory && (
        <QuoteAndPromptHistory {...{ setShowHistory, setPrompt, history, setHistory, handleCopyQuote }} />
      )}

    </>
  );
}