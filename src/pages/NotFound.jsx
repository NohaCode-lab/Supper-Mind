import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in duration-500">
      
      {/* Visual Icon Container */}
      <div className="p-6 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400 mb-8 shadow-sm border border-teal-100 dark:border-teal-800/50">
         <FiCompass size={48} />
      </div>
      
      {/* 404 Headline with Tailwind v4 Linear Gradient */}
      <h1 className="text-7xl md:text-9xl font-bold bg-linear-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
        404
      </h1>
      
      {/* Subtitle */}
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3">
        {t('notfound.title', 'Page Not Found')}
      </h2>
      
      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg">
        {t('notfound.subtitle', 'Sorry, the page you are looking for does not exist or has been moved.')}
      </p>
      
      {/* Call to Action */}
      <Link
        to="/"
        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
      >
        {t('notfound.btn_home', 'Go Back Home')}
      </Link>

    </div>
  );
}