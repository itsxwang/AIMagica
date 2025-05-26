import { useState } from 'react';

import { BsArrowReturnRight } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";



export default function QuoteAndPromptHistory(
  { setShowHistory, setPrompt, history, setHistory, handleCopyQuote, resolvedTheme }:
    {
      setShowHistory: React.Dispatch<React.SetStateAction<boolean>>,
      setPrompt: React.Dispatch<React.SetStateAction<string>>,
      history: { id: string, prompt: string, quote: string }[],
      setHistory: React.Dispatch<React.SetStateAction<{ id: string, prompt: string, quote: string }[]>>,
      handleCopyQuote: (text: string) => void,
      resolvedTheme: 'light' | 'dark'
    }) {

  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchQuote, setSearchQuote] = useState('');

  function handleInsertPrompt(prompt: string) {
    setPrompt(prompt);
    setShowHistory(false);
  }

  function handleDeletePrompt(id: string) {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
  }

  const filteredHistory = history.filter(item =>
    item.prompt.split(/\s/).join('').toLowerCase().includes(searchPrompt.split(/\s/).join('').toLowerCase()) &&
    item.quote.split(/\s/).join('').toLowerCase().includes(searchQuote.split(/\s/).join('').toLowerCase())
  );

  // Theme-based classes
  const theme = resolvedTheme === 'dark'
    ? {
      bgOverlay: "bg-black bg-opacity-70",
      container: "bg-slate-800 border-slate-600",
      input: "bg-slate-700 border-slate-600 text-white placeholder-gray-400",
      title: "text-white",
      closeBtn: "text-white hover:text-red-400",
      prompt: "text-gray-400",
      listItem: "bg-slate-700 border-slate-600",
      quote: "text-white",
      bsrightArrowHover: "hover:bg-slate-500",
      copyBtn: "text-white hover:text-blue-400 group-hover:text-inherit",
      deleteBtn: "text-white hover:text-red-400 group-hover:text-inherit",
      noMatch: "text-gray-400"
    }
    : {
      bgOverlay: "bg-black bg-opacity-30",
      container: "bg-white border-gray-300",
      input: "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500",
      title: "text-gray-900",
      closeBtn: "text-gray-900 hover:text-red-600",
      prompt: "text-gray-500",
      listItem: "bg-gray-100 border-gray-300",
      quote: "text-gray-900",
      bsrightArrow:'hover:bg-slate-200',
      copyBtn: "text-gray-900 hover:text-blue-600 group-hover:text-black",
      deleteBtn: "text-gray-900 hover:text-red-600 group-hover:text-black",
      noMatch: "text-gray-500"
    };

  return (
    <div className={`fixed inset-0 ${theme.bgOverlay} flex items-center justify-center z-50`}>
      <div className={`${theme.container} p-6 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto border`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold flex items-center gap-2 ${theme.title}`}>
            <FaHistory /> Prompt & Quote History
          </h2>
          <div className='p-1' onPointerUp={() => setShowHistory(false)}>
            <button
              type='button'
              className={`w-10 h-10 text-6xl rounded-full font-bold active:scale-50 transition-all duration-100 flex items-center justify-center ${theme.closeBtn}`}
            >
              &times;
            </button>
          </div>
        </div>

        {/* Search Fields (search by prompt and quote) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            className={`p-2 rounded ${theme.input}`}
            type="text"
            placeholder="Search by prompt..."
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
          />
          <input
            className={`p-2 rounded ${theme.input}`}
            type="text"
            placeholder="Search by quote..."
            value={searchQuote}
            onChange={(e) => setSearchQuote(e.target.value)}
          />
        </div>

        {/* Filtered History List */}
        {filteredHistory.length === 0 ? (
          <p className={theme.noMatch}>No matching history.</p>
        ) : (
          <ul className="space-y-4">
            {filteredHistory.map((item) => (
              <li key={item.id} className={`group p-4 rounded-lg border ${theme.listItem}`}>
                <div className={`text-sm mb-1 max-h-24 overflow-y-auto break-words whitespace-pre-line pr-2 ${theme.prompt}`}>
                  Prompt: {item.prompt}{' '}
                  <BsArrowReturnRight
                    className={`inline-block transition-all w-6.5 h-6.5 rounded-full p-[0.7px] active:scale-50 sm:text-transparent group-hover:text-inherit ${theme.bsrightArrow} cursor-pointer`}
                    onPointerDown={() => handleInsertPrompt(item.prompt)}
                  />
                </div>

                {/* Quote, Copy, Delete Button  */}
                <div className="flex justify-between items-center">
                  <p className={`italic text-lg max-w-[85%] ${theme.quote}`}>{item.quote}</p>

                  {/* Copy, Delete Button */}
                  <div className="flex gap-2">
                    <p
                      className={`transition-all duration-100 sm:text-transparent  ${theme.copyBtn} cursor-pointer`}
                      onClick={() => handleCopyQuote(item.quote)}
                      title="Copy quote"
                    >
                      <FaRegCopy className="text-2xl" />
                    </p>
                  
                    <p
                      className={`transition-all duration-100 sm:text-transparent  ${theme.deleteBtn} cursor-pointer`}
                      onClick={() => handleDeletePrompt(item.id)}
                      title="Delete prompt"
                    >
                      <RiDeleteBin6Line className="text-2xl" />
                    </p>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}