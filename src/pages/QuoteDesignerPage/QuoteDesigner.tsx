import { useRef, useState } from 'react';
import '../../styles/quote.css';

import useTypingEffect from '../../hooks/typingEffect';

import { v4 as uuidv4 } from 'uuid';


import useTheme from '../../hooks/useTheme';
import useLocalStorage from '../../hooks/localStorage';

import QuoteAndPromptHistory from './QuoteAndPromptHistory';

import { FaRegCopy } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import LinkToHome from '../../components/LinkToHome';

export default function QuoteDesigner() {
  const placeholderText = useTypingEffect(['Generate a Quote on lamborghini', 'Nicola Tesla Quote','Dr. Strange Quote, that starts from word `Dormammu` '  ], 55, 3000);
  const { resolvedTheme } = useTheme();  // <-- using resolvedTheme directly

  const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
  const [quote, setQuote] = useLocalStorage<string>('quote', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useLocalStorage<{ id: string; prompt: string; quote: string }[]>('quoteHistory', []);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(new AbortController());

  function handleGenerateQuote() {
    if (prompt.trim() && !isLoading) {
      setIsLoading(true);
      setError('');
      controllerRef.current = new AbortController();

      fetch(`https://api.jsongpt.com/json?prompt=${prompt}&quotes=only 1 quote in string format`, {
        signal: controllerRef.current.signal
      })
        .then(response => response.json())
        .then(data => {
          const newQuote = data.quotes;
          setQuote(newQuote);

          setHistory(prev => [{ id: uuidv4(), prompt, quote: newQuote }, ...prev]);

          setIsLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(`Error fetching quotes: ${err}`);
          }
          setIsLoading(false);
        });

      // fake api for testing
      // -----------------------------------

      // setTimeout(() => {
      //   if (controllerRef.current?.signal.aborted) {
      //     controllerRef.current = new AbortController();
      //     return;
      //   };
      //   console.log(controllerRef.current)
      //   const newQuote = Math.random() < 0.5 ? 'Hello World!' : 'Stay Inspired!';
      //   setQuote(newQuote);
      //   setHistory(prev => [{ id:uuidv4(), prompt, quote: newQuote }, ...prev]);
      //   setHistoryId(historyId + 1);
      //   setIsLoading(false);

      // }, 1000);

      // -----------------------------------

    } else {
      setQuote('Stay Inspired!');
    }
  }

  function handleStopGeneration(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    if (isLoading) {
      // console.log('Aborting generation...');
      controllerRef.current?.abort();
      setIsLoading(false);
    }
  }

  function handleCopyQuote(text: string) {
    navigator.clipboard.writeText(text);
  }

  // Theme-based styling
  const bgColor = resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-gray-100';
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900';
  const cardBg = resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300';
  const inputBg = resolvedTheme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900';
  const placeholderColor = resolvedTheme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-400';

  return (
    <>
      <LinkToHome />

      <div className={`custom-st-container min-h-screen px-4 py-12 ${bgColor} ${textColor} flex flex-col items-center space-y-12`}>
        {/* Title */}
        <header className="text-center">
          <h1 className="custom-st-header text-4xl md:text-6xl font-bold font-poppins tracking-wide">
            ✍️ QuoteCraft Studio
          </h1>
          <p className={`mt-2 text-lg md:text-xl ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Style your thoughts. Turn prompts into beautiful quotes.
          </p>
        </header>

        {/* Quote Canvas */}
        <div className={`group p-8 rounded-xl shadow-lg w-full max-w-2xl text-center text-2xl md:text-3xl font-medium italic border min-h-[150px] flex items-center justify-center relative ${cardBg}`}>
          {!error ? quote : <span className="text-red-400 font-semibold">{error}</span>}
          <button
            className="absolute right-4 bottom-4 sm:text-transparent hover:text-blue-400 group-hover:text-current transition cursor-pointer"
            aria-label="Copy quote"
            onClick={() => handleCopyQuote(quote)}
            type="button"
          >
            <FaRegCopy />
          </button>
        </div>

        {/* Input & Action */}
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          <textarea
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto ${inputBg} ${placeholderColor}`}
            rows={1}
            style={{ minHeight: '58px', maxHeight: '58px' }}
            placeholder={placeholderText}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            spellCheck={false}
          />

          <div className="flex gap-4 w-full justify-center">
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold flex items-center gap-2 cursor-pointer"
              onClick={handleGenerateQuote}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2 hover:cursor-pointer" onClick={handleStopGeneration}>
                  Generating...
                  <FaStopCircle className="animate-spin" style={{ width: "24px", height: "24px" }} />
                </span>
              ) : (
                'Generate Quote'
              )}
            </button>

            <button
              className={`px-5 py-2 ${resolvedTheme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer`}
              onClick={() => setShowHistory(true)}
            >
              <FaHistory /> History
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showHistory && (
        <QuoteAndPromptHistory {...{ setShowHistory, setPrompt, history, setHistory, handleCopyQuote, resolvedTheme }} />
      )}
    </>
  );
}
