import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "user";

export function AuthProvider({ children }) {
  // ✅ Lazy initialization (أفضل حل بدل useEffect)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const [loading] = useState(false);

  // 🔐 Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  // 🚪 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ⚡ Memoized context value (performance optimization)
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 🧠 Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};