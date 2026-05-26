import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Import our newly created services and helpers
import { supabase } from '../services/supabase';
import { handleAppError } from '../utils/helper';

// 1. Direct Zod Schema for validation
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Direct state variable for UI loading feedback
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Initialize form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Direct submission handler connecting to Supabase
  const onSubmit = async (data) => {
    setIsSubmittingForm(true);
    
    try {
      // Call Supabase to create the new user
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name, // Save the user's name to their metadata
          }
        }
      });

      // If Supabase returns an error, throw it so our catch block handles it
      if (error) throw error;
      
      // On success, notify the user and route directly to the dashboard
      toast.success(t('register.success', 'Account created! Welcome to Supper Mind.'));
      navigate('/dashboard');
      
    } catch (error) {
      // Pass the error to our clean global handler
      handleAppError(error, t('register.error_fallback', 'Could not create account.'));
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in duration-500">
      
      {/* Registration Card Container */}
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {t('register.title', 'Create your account')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('register.subtitle', 'Start your journey to better mental wellness.')}
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('register.name_label', 'Full Name')}
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-3.5 text-slate-400" size={18} />
              <input
                type="text"
                {...register('name')}
                disabled={isSubmittingForm}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                placeholder={t('register.name_placeholder', 'John Doe')}
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs mt-1.5">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('register.email_label', 'Email Address')}
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-slate-400" size={18} />
              <input
                type="email"
                {...register('email')}
                disabled={isSubmittingForm}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t('register.password_label', 'Password')}
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-slate-400" size={18} />
              <input
                type="password"
                {...register('password')}
                disabled={isSubmittingForm}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-rose-500 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmittingForm}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 shadow-sm"
          >
            {isSubmittingForm ? (
              t('register.creating', 'Creating account...')
            ) : (
              <>
                {t('register.btn_submit', 'Create Account')}
                <FiArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {t('register.back_home', '← Back to Home')}
          </Link>
        </div>

      </div>
    </div>
  );
}