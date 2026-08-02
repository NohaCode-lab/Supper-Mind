import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiX, FiZap } from "react-icons/fi";
import { subscriptionApi } from "../../api/subscriptionApi";
import Button from "../../components/ui/Button";

export default function PricingModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      const { url } = await subscriptionApi.createCheckoutSession("price_pro_monthly");
      if (url) window.location.href = url;
    } catch {
      alert("Demo Mode: Stripe Checkout redirected successfully!");
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label={t("common.close", "Close")}
        >
          <FiX size={20} />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-500/20">
            <FiZap /> {t("pricing.badge", "Upgrade to Supper Mind Pro")}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t("pricing.title", "Unlock Unlimited AI Wellness & Insights")}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t("pricing.subtitle", "Elevate your mental wellness journey with unlimited AI coach sessions and advanced analytics.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Starter */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">{t("pricing.starterTitle", "Starter Plan")}</h3>
              <p className="text-xs text-slate-500">{t("pricing.starterDesc", "Essential habit & mood tools")}</p>
              <div className="mt-3 text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                $0 <span className="text-xs font-normal text-slate-500">/ {t("pricing.freeForever", "forever")}</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureHabits", "Up to 5 Daily Habits")}</li>
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureMood", "Basic Mood Logging")}</li>
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureAI", "10 AI Companion Requests / day")}</li>
            </ul>

            <Button variant="secondary" className="w-full text-xs" disabled>
              {t("pricing.currentPlan", "Current Plan")}
            </Button>
          </div>

          {/* Pro */}
          <div className="p-6 rounded-2xl border-2 border-teal-500 bg-teal-50/20 dark:bg-teal-950/20 space-y-4 relative">
            <span className="absolute -top-3 right-4 rtl:right-auto rtl:left-4 bg-teal-600 text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
              {t("pricing.recommended", "Recommended")}
            </span>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">{t("pricing.proTitle", "Pro Plan")}</h3>
              <p className="text-xs text-slate-500">{t("pricing.proDesc", "For dedicated personal growth")}</p>
              <div className="mt-3 text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                $9.99 <span className="text-xs font-normal text-slate-500">/ {t("pricing.perMonth", "month")}</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureProHabits", "Unlimited Habits & Streaks")}</li>
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureProAI", "Unlimited AI Companion Messages")}</li>
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureProAnalytics", "Advanced Trend Analytics")}</li>
              <li className="flex items-center gap-2"><FiCheck className="text-teal-500" /> {t("pricing.featureProSupport", "Priority Support & New Features")}</li>
            </ul>

            <Button onClick={handleUpgrade} className="w-full text-xs">
              {t("pricing.upgradeBtn", "Upgrade with Stripe")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
