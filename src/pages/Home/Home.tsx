import FeatureCard from '../../components/FeatureCard'
import '../../styles/home.css'


export default function Home() {

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center px-4 py-12 font-poppins md:justify-center gap-7">
    <img src="./public/applogo2.jpg" alt="" height={"100px"} width={"100px"} style={{ borderRadius: "50%" }} />
      {/* Title and Tagline */}

      <div className='flex flex-col items-center'>

        {/* Title */}
        <h1 className="custom-st-heading text-5xl font-bold mb-4 text-center">Let's Ai Do Some Magic🪄</h1>

        {/* Short tagline */}

        <p className="custom-st-para text-lg md:text-xl text-gray-400 text-center max-w-2xl">
          Unleash your creativity with AI-powered tools. Generate unique images, hilarious memes, and beautifully styled quotes — all in one place.
        </p>

      </div>

      {/* Feature Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Avatar Generator */}
        <FeatureCard
          title="AI Image Generator"
          description="Create unique AI avatars from prompts."
          path="/image"
          emoji="🧑‍🎨"
        />

        {/* Meme Generator */}
        <FeatureCard
          title="AI Meme Generator"
          description="Make fun, custom memes with AI assistance."
          path="/meme"
          emoji="😂"
        />

        {/* Quote Designer */}
        <FeatureCard
          title="AI Quote Generator"
          description="Style beautiful quotes with backgrounds and fonts."
          path="/quote"
          emoji="💬"
        />
      </div>

    </div>
    </>
  )
}
