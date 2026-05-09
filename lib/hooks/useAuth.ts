import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isLoading, signIn, signUp, signOut, loadUser } = useAuthStore();
  
  useEffect(() => {
    loadUser();
  }, []);
  
  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
}