'use client';

import { LayoutDashboard, Map, Activity, Waves, ChevronRight, CircleDot, Database, LineChart, Users, Bell,User } from 'lucide-react';

type PageKey = 'dashboard' | 'surveys' | 'seismic' | 'profile';

interface SidebarProps {
  currentPage: PageKey;
  setCurrentPage: (page: PageKey) => void;
}

interface MenuItem {
  id: PageKey;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
  description?: string;
}

const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & metrics'
  },
  { 
    id: 'surveys', 
    label: 'Surveys', 
    icon: Map,
    description: 'Field surveys',
    badge: 3
  },
  { 
    id: 'seismic', 
    label: 'Seismic Data', 
    icon: Activity,
    description: 'Earthquake analysis'
  },
   { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    description: 'Your information'
  },
];

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700/50 flex flex-col fixed h-full shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 shadow-lg">
              <Waves className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              GeoSphere
            </h1>
            <p className="text-xs text-gray-400">Geophysics Dept System</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Menu */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`
                  relative w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                  transition-all duration-300 group overflow-hidden
                  ${isActive 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}
                
                {/* Icon with animation */}
                <div className={`
                  relative transition-transform duration-300
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                  <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-blue-400'} />
                </div>
                
                {/* Label and description */}
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium
                        ${isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-700 text-gray-300 group-hover:bg-gray-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {item.description}
                    </p>
                  )}
                </div>
                
                {/* Chevron indicator */}
                {isActive && (
                  <ChevronRight size={16} className="text-white/70" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Stats Section */}
        <div className="space-y-3">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Stats
          </p>
          <div className="grid grid-cols-2 gap-2 px-2">
            <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
              <Database size={14} className="text-blue-400 mb-1" />
              <p className="text-lg font-bold text-white">1,234</p>
              <p className="text-xs text-gray-400">Records</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
              <LineChart size={14} className="text-green-400 mb-1" />
              <p className="text-lg font-bold text-white">87%</p>
              <p className="text-xs text-gray-400">Accuracy</p>
            </div>
          </div>
        </div>
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Users size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Research Scientist</p>
            </div>
            <Bell size={16} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          
          {/* System Status */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-700/30">
            <CircleDot size={12} className="text-green-500" />
            <p className="text-xs text-gray-400">System Operational</p>
            <div className="flex-1"></div>
            <p className="text-xs text-gray-500">v2.0.1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}