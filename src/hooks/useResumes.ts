import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from './useAuth';
import { CVData } from '@/types/cv';

type Json = Database['public']['Tables']['resumes']['Row']['cv_data'];

type Resume = Database['public']['Tables']['resumes']['Row'];
type ResumeInsert = Database['public']['Tables']['resumes']['Insert'];
type ResumeUpdate = Database['public']['Tables']['resumes']['Update'];

interface ResumeError {
  message: string;
  originalError?: unknown;
}

export const useResumes = () => {
  const { user, isAuthenticated } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResumeError | null>(null);

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

      const fetchedResumes = data || [];
      setResumes(fetchedResumes);
      
    } catch (error: unknown) {
      console.error('Error fetching resumes:', error);
      setError({ 
        message: error instanceof Error ? error.message : 'Failed to fetch resumes. Please check your internet connection.',
        originalError: error 
      });
      setResumes([]);
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
  }, [isAuthenticated, user, fetchResumes]);

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
          cv_data: resumeData.cv_data as unknown as Json,
          template: resumeData.template,
        })
        .select()
        .single();

      if (error) throw error;

      const updatedResumes = [data, ...resumes];
      setResumes(updatedResumes);
      
      return data;
    } catch (error: unknown) {
      console.error('Error creating resume:', error);
      setError({ 
        message: error instanceof Error ? error.message : 'Failed to create resume. Please check your internet connection.',
        originalError: error 
      });
      throw error;
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

      const updatedResumes = resumes.map(resume => resume.id === id ? data : resume);
      setResumes(updatedResumes);
      
      return data;
    } catch (error: unknown) {
      console.error('Error updating resume:', error);
      setError({ 
        message: error instanceof Error ? error.message : 'Failed to update resume. Please check your internet connection.',
        originalError: error 
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      const updatedResumes = resumes.filter(resume => resume.id !== id);
      setResumes(updatedResumes);
      
      return true;
    } catch (error: unknown) {
      console.error('Error deleting resume:', error);
      setError({ 
        message: error instanceof Error ? error.message : 'Failed to delete resume. Please check your internet connection.',
        originalError: error 
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getResume = async (id: string) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return data;
    } catch (error: unknown) {
      console.error('Error fetching resume:', error);
      setError({ 
        message: error instanceof Error ? error.message : 'Failed to fetch resume. Please check your internet connection.',
        originalError: error 
      });
      throw error;
    } finally {
      setLoading(false);
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