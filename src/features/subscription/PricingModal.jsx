import { useState } from "react";
import { FiCheck, FiStar, FiZap, FiX } from "react-icons/fi";
import { subscriptionApi } from "../../api/subscriptionApi";
import Button from "../../components/ui/Button";

export default function PricingModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const res = await subscriptionApi.createCheckoutSession("price_premium_monthly");
      if (res.url) {
        window.location.href = res.url;
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
        >
          <FiX size={20} />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiStar /> Upgrade to Supper Mind Pro
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            Unlock Unlimited AI Wellness & Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Elevate your mental wellness journey with unlimited AI coach sessions and advanced analytics.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Free Tier */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Starter Plan</h3>
              <p className="text-xs text-slate-500 mt-0.5">Essential habit & mood tools</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">$0</span>
                <span className="text-xs text-slate-500"> / forever</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Up to 5 Daily Habits</li>
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Basic Mood Logging</li>
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> 10 AI Companion Requests / day</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={onClose}>
              Current Plan
            </Button>
          </div>

          {/* Premium Tier */}
          <div className="p-6 rounded-2xl border-2 border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 flex flex-col justify-between relative shadow-md">
            <span className="absolute -top-3 right-4 bg-teal-600 text-white text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full">
              Recommended
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <FiZap className="text-amber-500" /> Pro Plan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">For dedicated personal growth</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">$9.99</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Unlimited Habits & Streaks</li>
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Unlimited AI Companion Messages</li>
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Advanced Trend Analytics</li>
                <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> Priority Support & New Features</li>
              </ul>
            </div>
            <Button isLoading={isLoading} onClick={handleSubscribe} className="w-full mt-6 shadow-teal-500/20">
              Upgrade with Stripe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
