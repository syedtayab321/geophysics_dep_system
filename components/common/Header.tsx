// components/common/Header.tsx
'use client';

import { Bell, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

// Define the same PageKey type as in Sidebar
type PageKey = 'dashboard' | 'surveys' | 'seismic' | 'profile';

interface HeaderProps {
  currentPage?: string;
  setCurrentPage?: (page: PageKey) => void; // Change from string to PageKey
}

interface Profile {
  full_name: string;
  department: string;
  role: string;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const { signOut, user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('full_name, department, role')
        .eq('id', user.id)
        .single();
      
      if (data) setProfile(data);
    };

    fetchProfile();
  }, [user?.id]);

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    surveys: 'Surveys',
    seismic: 'Seismic Data',
    profile: 'Profile Settings',
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {currentPage ? pageTitles[currentPage] : 'Dashboard'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Researcher'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-48"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {profile?.full_name || user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {profile?.role || 'User'} • {profile?.department || 'No Dept'}
              </p>
            </div>
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-medium">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      if (setCurrentPage) setCurrentPage('profile');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User size={16} />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}