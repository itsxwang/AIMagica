
import FeatureCard from '../../components/FeatureCard';
import '../../styles/home.css';
import useTheme  from '../../hooks/useTheme';
import ThemeSelector from './ThemeSelector';

import useTypingEffect from '../../hooks/typingEffect';

export default function Home() {
  const typedText = useTypingEffect(['Prompt Your Ideas','Generate Unique Images','Generate Hilarious Memes', 'Design Beautiful Quotes'], 55,3500);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const containerClasses = resolvedTheme === 'dark'
  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'
  : 'bg-gradient-to-br from-blue-50 to-pink-50 text-gray-800';

  return (
    <>
      <ThemeSelector theme={theme} setTheme={setTheme}  />

      {/* Main Content */}
      <div className={`min-h-screen ${containerClasses} flex flex-col items-center px-4 py-12 font-poppins md:justify-center gap-7 transition-colors duration-300`}>
        <img src="./public/applogo2.jpg" alt="" height={"100px"} width={"100px"} style={{ borderRadius: "50%" }} />

        {/* Title and Tagline */}
        <div className='flex flex-col items-center'>
          <h1 className="custom-st-heading text-5xl font-bold mb-4 text-center">
              <>
                {typedText.slice(0, -1)}
                <span className='font-light'>{typedText.slice(-1)}</span>
              </>
          </h1>
          <p className="custom-st-para text-lg md:text-xl text-center max-w-2xl text-gray-500 dark:text-gray-400">
            Unleash your creativity with AI-powered tools. Generate unique images, hilarious memes, and beautifully styled quotes — all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <FeatureCard title="AI Image Generator" description="Create unique AI images from prompts." path="/image" emoji="🧑‍🎨" />
          <FeatureCard title="AI Meme Generator" description="Make fun, custom memes with AI assistance." path="/meme" emoji="😂" />
          <FeatureCard title="AI Quote Generator" description="Just prompt and get a quote. It's that easy !" path="/quote" emoji="💬" />
        </div>
      </div>
    </>
  );
}
