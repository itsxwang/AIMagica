import { useState } from 'react';
import LinkToHome from '../../components/LinkToHome';
import useLocalStorage from '../../hooks/localStorage';
import { FaStopCircle } from "react-icons/fa";
import useTheme from '../../hooks/useTheme';
import '../../styles/imageGenerator.css';

function PicGenerator() {
  const { resolvedTheme } = useTheme();  // <-- using resolvedTheme directly

  const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');
  const [imageUrl, setImageUrl] = useLocalStorage<string>('imageUrl', '');

  const handleGenerate = () => {
    setIsLoading(true);

    // just for testing, will replace with it actual api
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://imgs.search.brave.com/nP5KN8Br2pudRMMxX5Z9esTDF5qZtnga_Tgj_1BT5SM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vT19LUXF1/SEVaRE1DUVRmeEh0/amc4WGdHUzd0THhv/REJhUk5HLVA4WW5X/MC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk1U/STMvT0Rnek9UZzNO/Uzl3YUc5MC9ieTlr/WldWd0xYTndZV05s/L0xXSmhZMnRuY205/MWJtUXUvYW5CblAz/TTlOakV5ZURZeC9N/aVozUFRBbWF6MHlN/Q1pqL1BVWmhabXQw/VFc1NWJYZEMvY0Y5/cmVFRjJZbmN6YjB4/ci9RbXR4YkRsb2VG/SmlkMjltL00zWnlO/V1pxUzFFOQ');
      }, 2000);
    }).then((url) => {
      setImageUrl(url as string);
      setIsLoading(false);
    });
  };

  function handleStopGeneration(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    if (isLoading) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LinkToHome />

      <div className={`custom-st-container min-h-screen px-4 py-12 flex flex-col items-center justify-center space-y-4
        ${resolvedTheme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>

        {/* Title */}
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins tracking-wide">
            🖼️ PicGenerator
          </h1>
          <p className={`mt-2 text-lg md:text-xl ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Transform your words into stunning visuals.
          </p>
        </header>

        {/* Image Display */}
        <div className={`p-8 rounded-xl shadow-lg w-full max-w-2xl flex items-center justify-center min-h-[300px]
          ${resolvedTheme === 'dark' ? 'bg-slate-800 border-1 border-slate-700' : 'bg-slate-50 shadow-gray-300 border-1 border-gray-300'}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated"
              className="max-w-full h-auto rounded-lg"
            />
          ) : (
            <span className={`${resolvedTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'} italic`}>
              Your generated image will appear here.
            </span>
          )}
        </div>

        {/* Input & Action */}
        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
          <textarea
              rows={1}
            className={`w-full p-3 rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto
              ${resolvedTheme === 'dark'
                ? 'bg-slate-700 border-slate-600 text-white'
                : 'bg-white border-gray-300 text-black'}`}
            style={{ minHeight: '58px', maxHeight: '58px' }}
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold cursor-pointer"
            onClick={handleGenerate}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2"  onClick={handleStopGeneration} >
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
