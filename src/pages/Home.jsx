
import { motion } from "framer-motion"

function Home() {
  return (
    <div className="space-y-24">

      {/* HERO SECTION */}
      <section className="text-center pt-20 px-6">

        <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-5xl md:text-6xl font-bold mb-6"
>
          Your Calm Digital Companion <br />
          for Mental Wellness
        </motion.h1>

        <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-gray-300 text-lg max-w-2xl mx-auto mb-10"
>
          Supper Mind helps you reduce stress, track your mood, and find emotional balance
          with AI-powered mental support.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">

          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-medium transition">
            Get Started
          </button>

          <button className="border border-gray-600 px-6 py-3 rounded-xl text-gray-300 hover:text-white transition">
            Learn More
          </button>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-6">

        <h2 className="text-center text-3xl font-bold mb-12">
          Why Supper Mind?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">AI Support</h3>
            <p className="text-gray-400">
              Talk with an AI companion that understands your emotions.
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Stress Relief</h3>
            <p className="text-gray-400">
              Guided exercises to calm your mind instantly.
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
            <p className="text-gray-400">
              Understand your emotional patterns over time.
            </p>
          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="text-center bg-[#0b1220] py-20 px-6 rounded-3xl mx-6">

        <h2 className="text-3xl font-bold mb-4">
          Start your mental wellness journey today
        </h2>

        <p className="text-gray-400 mb-8">
          Join thousands improving their mental health with Supper Mind.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-medium transition">
          Get Started Free
        </button>

      </section>

    </div>
  )
}

export default Home