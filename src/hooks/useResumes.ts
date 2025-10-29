import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from './useAuth';
import { CVData } from '@/pages/Builder';

type Resume = Database['public']['Tables']['resumes']['Row'];
type ResumeInsert = Database['public']['Tables']['resumes']['Insert'];
type ResumeUpdate = Database['public']['Tables']['resumes']['Update'];

export const useResumes = () => {
  const { user, isAuthenticated } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchResumes = useCallback(async () => {
    if (!user) {
      console.log('No user authenticated, skipping resume fetch');
      setResumes([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      setResumes(data || []);
    } catch (error: any) {
      // Silently handle database connection errors in development
      if (error.message?.includes('Failed to fetch') || error.code === 'PGRST301') {
        console.warn('Database not available - using local storage fallback');
        // Try to load from localStorage as fallback
        const localResumes = localStorage.getItem('cvcraft_resumes');
        if (localResumes) {
          try {
            setResumes(JSON.parse(localResumes));
          } catch {
            setResumes([]);
          }
        } else {
          setResumes([]);
        }
      } else {
        console.error('Error fetching resumes:', error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchResumes();
    } else {
      setResumes([]);
      setError(null);
    }
  }, [isAuthenticated, user]); // Removed fetchResumes from dependencies

  const createResume = async (resumeData: {
    title: string;
    cv_data: CVData;
    template: string;
  }) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title: resumeData.title,
          cv_data: resumeData.cv_data as any,
          template: resumeData.template,
        })
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => [data, ...prev]);
      return data;
    } catch (error: any) {
      // Handle database connection errors gracefully
      if (error.message?.includes('Failed to fetch') || error.code === 'PGRST301') {
        console.warn('Database not available - saving to local storage');
        // Create a mock resume object for local storage
        const mockResume = {
          id: `local_${Date.now()}`,
          user_id: user.id,
          title: resumeData.title,
          cv_data: resumeData.cv_data,
          template: resumeData.template,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Save to localStorage
        const localResumes = localStorage.getItem('cvcraft_resumes');
        const resumes = localResumes ? JSON.parse(localResumes) : [];
        resumes.unshift(mockResume);
        localStorage.setItem('cvcraft_resumes', JSON.stringify(resumes));
        
        setResumes(prev => [mockResume as any, ...prev]);
        return mockResume as any;
      } else {
        console.error('Error creating resume:', error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (id: string, updates: Partial<ResumeUpdate>) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => 
        prev.map(resume => resume.id === id ? data : resume)
      );
      return data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setResumes(prev => prev.filter(resume => resume.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getResume = async (id: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  };

  return {
    resumes,
    loading,
    error,
    fetchResumes,
    createResume,
    updateResume,
    deleteResume,
    getResume,
  };
};