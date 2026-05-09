import { create } from 'zustand';
import { supabase } from '../supabase/client';
import { Survey, SeismicData } from '@/types';

interface SurveyState {
  surveys: Survey[];
  currentSurvey: Survey | null;
  seismicData: SeismicData[];
  isLoading: boolean;
  fetchSurveys: () => Promise<void>;
  fetchSurveyById: (id: string) => Promise<void>;
  createSurvey: (survey: Omit<Survey, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSurvey: (id: string, updates: Partial<Survey>) => Promise<void>;
  deleteSurvey: (id: string) => Promise<void>;
  fetchSeismicData: (surveyId?: string) => Promise<void>;
  addSeismicData: (data: Omit<SeismicData, 'id' | 'created_at'>) => Promise<void>;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  surveys: [],
  currentSurvey: null,
  seismicData: [],
  isLoading: false,
  
  fetchSurveys: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    set({ surveys: data as Survey[], isLoading: false });
  },
  
  fetchSurveyById: async (id) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    set({ currentSurvey: data as Survey, isLoading: false });
  },
  
  createSurvey: async (survey) => {
    const { data, error } = await supabase
      .from('surveys')
      .insert([survey])
      .select()
      .single();
    
    if (error) throw error;
    set({ surveys: [data as Survey, ...get().surveys] });
  },
  
  updateSurvey: async (id, updates) => {
    const { data, error } = await supabase
      .from('surveys')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    set({
      surveys: get().surveys.map(s => s.id === id ? data as Survey : s),
      currentSurvey: get().currentSurvey?.id === id ? data as Survey : get().currentSurvey,
    });
  },
  
  deleteSurvey: async (id) => {
    const { error } = await supabase
      .from('surveys')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    set({ surveys: get().surveys.filter(s => s.id !== id) });
  },
  
  fetchSeismicData: async (surveyId) => {
    set({ isLoading: true });
    let query = supabase.from('seismic_data').select('*');
    
    if (surveyId) {
      query = query.eq('survey_id', surveyId);
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    if (error) throw error;
    set({ seismicData: data as SeismicData[], isLoading: false });
  },
  
  addSeismicData: async (data) => {
    const { data: newData, error } = await supabase
      .from('seismic_data')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    set({ seismicData: [newData as SeismicData, ...get().seismicData] });
  },
}));