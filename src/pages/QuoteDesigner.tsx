import { useRef, useState } from 'react'; import '../styles/quote.css';

import { FaRegCopy } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";

import LinkToHome from '../components/LinkToHome';

function QuoteDesigner() {
  const [prompt, setPrompt] = useState<string>('');
  const [quote, setQuote] = useState<string>('Quote of the Day!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const controllerRef = useRef<AbortController | null>(null);


  function handleGenerateQuote() {

    if (prompt) {
      setIsLoading(true);
      setError('');
      controllerRef.current = new AbortController(); // Create a new controller instance and store it

      fetch(`https://api.jsongpt.com/json?prompt=${prompt}&quotes=only 1 quote in string format`, {
        signal: controllerRef.current.signal
      })
        .then(response => response.json())
        .then(data => {
          setQuote(data.quotes);
          setIsLoading(false);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            setError('');
          } else {
            setError(`Error fetching quotes: ${err}`);
          }
          setIsLoading(false);
        });
    } else {
      setQuote('Stay Inspired !');
    }
  }

  function handlePauseGeneration(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    if (isLoading) {
      controllerRef.current?.abort();
      setIsLoading(false);
      return;
    }
  }


  return (
    <>

    <LinkToHome />

      <div className="custom-st-container min-h-screen px-4 py-12 bg-slate-900 text-white flex flex-col items-center space-y-12">

        {/* Title */}
        <header className="text-center">
          <h1 className="custom-st-header text-4xl md:text-6xl font-bold font-poppins tracking-wide ">
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
            className="absolute right-4 bottom-4 text-transparent group-hover:text-white transition active:scale-50"
            aria-label="Copy quote"
            onClick={() => {
              navigator.clipboard.writeText(quote);
            }}
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

          <button
            // disabled={isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer transition rounded-lg text-white font-semibold h-11.5 "
            onClick={handleGenerateQuote}
          >
            {
              isLoading ?
                <span className="inline-flex items-center gap-2"
                  onClick={handlePauseGeneration}
                >
                  Generating...

                  <FaStopCircle style={{ height: "30px", width: "30px" }} className="animate-spin" />

                </span>
                : 'Generate Quote'}
          </button>


        </div>
      </div>
    </>
  );
}

export default QuoteDesigner;
