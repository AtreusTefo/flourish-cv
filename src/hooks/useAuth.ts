import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      // Clear local session first
      setUser(null);
      
      // Attempt Supabase logout with better error handling
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      
      if (error) {
        console.error('Logout error:', error);
        // Even if logout fails on server, we've cleared local state
        // This ensures user appears logged out in the UI
      }
      
      // Clear any remaining session data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Ensure user is logged out locally even if server request fails
      setUser(null);
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  };
};