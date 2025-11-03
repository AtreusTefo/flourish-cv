import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Resume = Database['public']['Tables']['resumes']['Row'];
type ResumeInsert = Database['public']['Tables']['resumes']['Insert'];
type ResumeUpdate = Database['public']['Tables']['resumes']['Update'];

export interface ResumeData {
  title: string;
  cv_data: any;
  template: string;
}

export class ResumeService {
  /**
   * Create a new resume
   */
  static async createResume(resumeData: ResumeData): Promise<Resume> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        title: resumeData.title,
        cv_data: resumeData.cv_data,
        template: resumeData.template,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resume:', error);
      throw new Error(`Failed to create resume: ${error.message}`);
    }

    return data;
  }

  /**
   * Update an existing resume
   */
  static async updateResume(resumeId: string, resumeData: Partial<ResumeData>): Promise<Resume> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const updateData: ResumeUpdate = {};
    
    if (resumeData.title !== undefined) updateData.title = resumeData.title;
    if (resumeData.cv_data !== undefined) updateData.cv_data = resumeData.cv_data;
    if (resumeData.template !== undefined) updateData.template = resumeData.template;

    const { data, error } = await supabase
      .from('resumes')
      .update(updateData)
      .eq('id', resumeId)
      .eq('user_id', user.id) // Ensure user can only update their own resumes
      .select()
      .single();

    if (error) {
      console.error('Error updating resume:', error);
      throw new Error(`Failed to update resume: ${error.message}`);
    }

    return data;
  }

  /**
   * Get a specific resume by ID
   */
  static async getResume(resumeId: string): Promise<Resume | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', user.id) // Ensure user can only access their own resumes
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching resume:', error);
      throw new Error(`Failed to fetch resume: ${error.message}`);
    }

    return data;
  }

  /**
   * Get all resumes for the current user
   */
  static async getUserResumes(): Promise<Resume[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user resumes:', error);
      throw new Error(`Failed to fetch resumes: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Delete a resume
   */
  static async deleteResume(resumeId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('user_id', user.id); // Ensure user can only delete their own resumes

    if (error) {
      console.error('Error deleting resume:', error);
      throw new Error(`Failed to delete resume: ${error.message}`);
    }
  }

  /**
   * Check if a resume ID is valid and belongs to the current user
   */
  static async validateResumeOwnership(resumeId: string): Promise<boolean> {
    try {
      const resume = await this.getResume(resumeId);
      return resume !== null;
    } catch (error) {
      return false;
    }
  }
}