import { useState } from 'react';
import LinkToHome from '../../components/LinkToHome';
import useLocalStorage from '../../hooks/localStorage';

import { FaStopCircle } from "react-icons/fa";

import '../../styles/imageGenerator.css';




function PicGenerator() {
  const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  const [imageUrl, setImageUrl] = useLocalStorage<string>('imageUrl', '');

  const handleGenerate = () => {
    // just testing, will replace with real api call

    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://imgs.search.brave.com/HqM6JHQDX4dWi559HTXpGuGOGofSbp5CNEYBsd6RDgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vVndIZ19V/cE9xTGRSaXNKU044/T3NJak9GcDRReEFk/NDBTTkxyREVWZGo4/NC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlo/ZG1GMC9ZWEp6TG0x/a2N5NTVZVzVrL1pY/Z3VibVYwTDJrX2FX/UTkvTlRjMU9UUmhO/ekkzWkRBNS9ORFUy/TnpGaE9XRmpOVGMz/L1pURTFaV1l5WldF/dE5USXgvTnpFd01D/MXBiV0ZuWlhNdC9k/R0ZoY3kxamIyNXpk/VzFsL2NuTW1iajB5/Tnlab1BUTTQvTkNa/M1BUUTRNQQ');
      }, 2000);
    }).then((imageUrl) => {setImageUrl(imageUrl); setIsLoading(false);});
    // for testing



  };

  return (
    <>
      <LinkToHome />
      <div className="custom-st-container min-h-screen px-4 py-12 bg-slate-900 text-white flex flex-col items-center justify-center space-y-4">

        {/* Title */}
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins tracking-wide">
            🖼️ PicGenerator
          </h1>
          <p className="mt-2 text-gray-400 text-lg md:text-xl">
            Transform your words into stunning visuals.
          </p>
        </header>

        {/* Image Display */}
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-2xl flex items-center justify-center min-h-[300px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated"
              className="max-w-full h-auto rounded-lg"
            />
          ) : (
            <span className="text-gray-500 italic">Your generated image will appear here.</span>
          )}
        </div>

        {/* Input & Action */}
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          <input
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
            onClick={handleGenerate}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2" /*onClick={handlePauseGeneration}*/>
                Generating...
                <FaStopCircle className="animate-spin" style={{ width: "24px", height: "24px" }} />
              </span>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default PicGenerator;
