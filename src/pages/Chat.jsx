import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSend, FiUser, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

// 1. Import your decoupled services and global state
import { generateAIResponse } from '../services/openai';
import { useAppStore } from '../stores/useAppStore';
import { handleAppError } from '../utils/helper';

export default function Chat() {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  
  // 2. Pull in global state to track user activity
  const incrementSessions = useAppStore((state) => state.incrementSessions);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: t('chat.welcome', 'Hi 👋 I am Supper Mind. How are you feeling today? Take your time.'),
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // 3. Clean business logic: Send the history to the service layer
      const aiResponseText = await generateAIResponse(updatedMessages);

      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: aiResponseText 
      }]);

      // 4. Update the global dashboard stats seamlessly
      incrementSessions();

    } catch (error) {
      // 5. Use your unified error handler
      handleAppError(error, t('chat.error_fallback', 'I am having trouble connecting right now.'));
      
      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: t('chat.error', 'I am having a little trouble connecting right now, but I am still here. Let us try again in a moment.') 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <FiHeart size={20} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            {t('chat.title', 'Supper Mind Companion')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('chat.status', 'Always here for you')}
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className="shrink-0 mt-1">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <FiUser size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                    <FiHeart size={16} />
                  </div>
                )}
              </div>

              <div 
                className={`px-5 py-3.5 rounded-2xl text-base ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 rounded-tr-sm' 
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>

            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3 max-w-[80%] flex-row">
              <div className="shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                  <FiHeart size={16} />
                </div>
              </div>
              <div className="px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-sm flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 relative max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('chat.input_placeholder', 'Share what is on your mind...')}
            className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full transition-colors flex items-center justify-center shadow-sm"
          >
            <FiSend size={18} className="mr-0.5 mt-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}