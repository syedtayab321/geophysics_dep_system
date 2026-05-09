import { create } from 'zustand';
import { supabase } from '../supabase/client';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (profile) {
      set({ user: profile as User });
    } else {
      const { data: newProfile } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || '',
            department: data.user.user_metadata?.department || '',
            role: 'user',
          }
        ])
        .select()
        .single();
      
      set({ user: newProfile as User });
    }
  },
  
  signUp: async (email, password, userData) => {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          department: userData.department,
        },
      },
    });
    
    if (signUpError) throw signUpError;
    
    if (!authData.user) {
      throw new Error('User creation failed');
    }

    let retries = 0;
    let session = null;
    while (retries < 5) {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        session = data.session;
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      retries++;
    }

    if (!session) {
      throw new Error('Session not established');
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        full_name: userData.full_name,
        department: userData.department,
        role: userData.role || 'user',
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw new Error(`Failed to create user profile: ${profileError.message}`);
    }
    
    return { 
      success: true, 
      message: 'Registration successful! Please check your email to confirm your account.'
    };
    
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Registration failed'
    };
  }
},
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  
  loadUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get the user's profile
        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        // If profile doesn't exist, create it
        if (!profile) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || '',
                department: user.user_metadata?.department || '',
                role: 'user',
              }
            ])
            .select()
            .single();
          
          profile = newProfile;
        }
        
        set({ user: profile as User, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ user: null, isLoading: false });
    }
  },
}));