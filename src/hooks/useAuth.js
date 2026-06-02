
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { handleAppError } from '../utils/helper';
import { ROUTES } from '../utils/constants';

export function useAuth() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Direct check for an existing session on initial load
    const checkActiveSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setCurrentUser(session?.user || null);
      } catch (error) {
        console.error('Session verification failed:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkActiveSession();

    // 2. Setup a direct listener for authentication state changes (e.g., token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Direct logout handler
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Navigate strictly to the home page after a successful sign out
      navigate(ROUTES.HOME);
    } catch (error) {
      handleAppError(error, 'Failed to sign out securely.');
    }
  };

  return { 
    currentUser, 
    isAuthLoading, 
    isAuthenticated: !!currentUser,
    signOut 
  };
}