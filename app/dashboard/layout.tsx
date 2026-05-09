'use client';

import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DashboardPage from './page';
import SurveysPage from './surveys/page';
import SeismicPage from './seismic/page';
import ProfilePage from './profile/page';

type PageKey = 'dashboard' | 'surveys' | 'seismic' | 'profile';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'surveys':
        return <SurveysPage />;
      case 'seismic':
        return <SeismicPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-72">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fadeIn">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}