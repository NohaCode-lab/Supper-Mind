import { ToastContainer } from 'react-toastify';
import { useAppStore } from '../../stores/useAppStore';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  // Sync the toast theme directly with our global Zustand theme state
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme={isDarkMode ? 'dark' : 'light'}
      toastClassName={() => 
        `relative flex p-4 min-h-10 rounded-xl justify-between overflow-hidden cursor-pointer shadow-sm border mb-3 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-800'
        }`
      }
    />
  );
}