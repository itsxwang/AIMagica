import { useState } from 'react';

import { BsArrowReturnRight } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";



export default function QuoteAndPromptHistory(
  { setShowHistory,setPrompt,history,setHistory,handleCopyQuote }:
    {
      setShowHistory: React.Dispatch<React.SetStateAction<boolean>>,
      setPrompt: React.Dispatch<React.SetStateAction<string>>,
      history: { id: number, prompt: string, quote: string }[],
      setHistory: React.Dispatch<React.SetStateAction<{ id: number, prompt: string, quote: string }[]>>,
      handleCopyQuote: (text: string) => void

    }) {

  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchQuote, setSearchQuote] = useState('');


  function handleInsertPrompt(prompt: string) {
  setPrompt(prompt);
  setShowHistory(false);
}

  function handleDeletePrompt(id: number) {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
  }

  const filteredHistory = history.filter(item =>
  item.prompt.split(/\s/).join('').toLowerCase().includes(searchPrompt.split(/\s/).join('').toLowerCase()) &&
  item.quote.split(/\s/).join('').toLowerCase().includes(searchQuote.split(/\s/).join('').toLowerCase())
);
  return (

    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto border border-slate-600">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaHistory /> Prompt & Quote History
          </h2>
          <div className='p-1' onPointerUp={() => setShowHistory(false)}>
            <button
              type='button'
              className="w-10 h-10 text-6xl rounded-full text-white hover:text-red-400 hover:scale-110 font-bold active:scale-50 transition-all duration-100 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Search Fields (search by prompt and quote) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            className="p-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400"
            type="text"
            placeholder="Search by prompt..."
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
          />
          <input
            className="p-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400"
            type="text"
            placeholder="Search by quote..."
            value={searchQuote}
            onChange={(e) => setSearchQuote(e.target.value)}
          />
        </div>

        {/* Filtered History List */}
        {filteredHistory.length === 0 ? (
          <p className="text-gray-400">No matching history.</p>
        ) : (
          <ul className="space-y-4">
            {filteredHistory.map((item) => (
              <li key={item.id} className="group bg-slate-700 p-4 rounded-lg border border-slate-600">
                <p className="text-sm text-gray-400 mb-1">
                  Prompt: {item.prompt} {' '}
                  <BsArrowReturnRight
                    className="inline-block transition-all w-6.5 h-6.5 rounded-full text-white hover:bg-slate-500 p-[0.7px] active:scale-50 sm:text-transparent group-hover:text-white"
                    onPointerDown={() => handleInsertPrompt(item.prompt)}
                  />
                </p>

                {/* Quote, Copy, Delete Button  */}
                <div className="flex justify-between items-center">
                  <p className="text-white italic text-lg max-w-[85%]">{item.quote}</p>

                  {/* Copy, Delete Button */}
                  <div className="flex gap-2">
                    <button
                      className="text-white hover:text-blue-400 active:scale-50 transition-all duration-100 sm:text-transparent group-hover:text-white"
                      onClick={() => handleCopyQuote(item.quote)}
                      title="Copy quote"
                    >
                      <FaRegCopy className="text-2xl" />
                    </button>

                    <button
                      className="text-white hover:text-red-400 active:scale-50 transition-all duration-100 sm:text-transparent group-hover:text-white"
                      onClick={() => handleDeletePrompt(item.id)}
                      title="Delete prompt"
                    >
                      <RiDeleteBin6Line className="text-2xl" />
                    </button>
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