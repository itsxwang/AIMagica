import { useState } from 'react';
import LinkToHome from '../../components/LinkToHome';
import useTheme from '../../hooks/useTheme';
import { FaStopCircle } from "react-icons/fa";

import '../../styles/memeGenerator.css'; 
import useLocalStorage from '../../hooks/localStorage';

export default function MemeGenerator() {
  
  

  const { resolvedTheme } = useTheme();

  const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
  const [memeUrl, setMemeUrl] = useLocalStorage<string>('memeUrl', '');
  const [isLoading, setIsLoading] = useState(false);

  // Dummy meme image for demo; replace with API logic
  const defaultMeme =
    'https://i.imgflip.com/1bij.jpg';

  const handleGenerate = () => {
    if (!isLoading) {
      setIsLoading(true);
      // Simulate meme generation
      setTimeout(() => {
        setMemeUrl(defaultMeme);
        setIsLoading(false);
      }, 3500);
    }
  };


    
  function handleStopGeneration(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    if (isLoading) {
      // controllerRef.current?.abort();
      setIsLoading(false);
    }
  }


  const bgColor = resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-gray-100';
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900';
  const cardBg = resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300';
  const inputBg = resolvedTheme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900 placeholder:text-gray-400';

  return (
    <>
      <LinkToHome />

      <div className={`custom-st-container min-h-screen px-4 py-12 ${bgColor} ${textColor} flex flex-col items-center space-y-7`}>
        {/* Title */}
        <header className="text-center">
          <h1 className="custom-st-heading text-4xl md:text-6xl font-bold font-poppins tracking-wide">
            😀Meme Generator
          </h1>
          <p className={`mt-2 text-lg md:text-xl ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Turn Words Into Meme!
          </p>
        </header>

        {/* Meme Display */}
        <div className={`relative p-8 rounded-xl shadow-lg w-full max-w-2xl flex items-center justify-center min-h-[350px] border-1 border-gray-300 ${cardBg}`}>
          {memeUrl ? (
            <div className="relative w-full flex justify-center">
              <img
                src={memeUrl}
                alt="Meme"
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: 350 }}
              />
            </div>
          ) : (
            <span className={`${resolvedTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'} italic`}>
              Your meme will appear here.
            </span>
          )}
        </div>

        {/* Input & Action */}
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          <textarea
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} resize-none overflow-auto`}
            placeholder="Describe the meme you want to generate"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold w-50% cursor-pointer"
            onClick={handleGenerate}
          >
            {isLoading ? (
            <span className="inline-flex items-center gap-2" onClick={handleStopGeneration}>
            Generating...
            <FaStopCircle className="animate-spin" style={{ width: "24px", height: "24px" }} />
          </span>
              ) : (
          'Generate Meme'
              )}
          </button>
        </div>
      </div>
    </>
  );
}