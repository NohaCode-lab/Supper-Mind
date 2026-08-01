import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-24 pb-12 animate-in fade-in duration-700">

      {/* HERO SECTION */}
      <section className="text-center pt-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-slate-800 dark:text-slate-100"
        >
          {t("home.heroTitle", "Your Calm Digital Companion")} <br />
          <span className="bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
             {t("home.heroSubtitle", "for Mental Wellness")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-10"
        >
          {t("home.heroDesc", "Supper Mind helps you reduce stress, track your mood, and find emotional balance with AI-powered mental support.")}
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link 
            to={isAuthenticated ? "/chat" : "/register"}
            className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg"
          >
            {t("home.btnStart", "Get Started")}
          </Link>

          <a 
            href="#features"
            className="border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {t("home.btnLearn", "Learn More")}
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="px-6 scroll-mt-20">
        <h2 className="text-center text-3xl font-bold mb-12 text-slate-800 dark:text-slate-100">
          {t("home.featuresTitle", "Why Supper Mind?")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
              {t("home.feature1Title", "AI Support")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t("home.feature1Desc", "Talk with an AI companion that understands your emotions.")}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
              {t("home.feature2Title", "Stress Relief")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t("home.feature2Desc", "Guided exercises to calm your mind instantly.")}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
              {t("home.feature3Title", "Mood Tracking")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t("home.feature3Desc", "Understand your emotional patterns over time.")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="text-center bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 py-20 px-6 rounded-3xl mx-6 shadow-sm">
        <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          {t("home.ctaTitle", "Start your mental wellness journey today")}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {t("home.ctaDesc", "Join thousands improving their mental health with Supper Mind.")}
        </p>
        <Link 
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="bg-teal-600 hover:bg-teal-700 px-8 py-3 rounded-xl text-white font-medium transition-all shadow-md inline-block"
        >
          {isAuthenticated ? t("home.btnDashboard", "Go to Dashboard") : t("home.btnRegister", "Get Started Free")}
        </Link>
      </section>

    </div>
  );
}