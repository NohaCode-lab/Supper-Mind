import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const AppContext = createContext();

// 2. Create the Provider Component
export function AppProvider({ children }) {
  // Direct state for managing the mobile sidebar visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Clean handler functions
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <AppContext.Provider
      value={{
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 3. Export a custom hook for easy, direct access in any component
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}