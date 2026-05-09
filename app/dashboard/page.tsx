'use client';

import { FileText, Activity, MapPin, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import SurveyChart from '@/components/dashboard/SurveyChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useSurveys } from '@/lib/hooks/useSurveys';

export default function DashboardPage() {
  const { surveys, seismicData } = useSurveys();

  const stats = {
    totalSurveys: surveys.length,
    activeSurveys: surveys.filter(s => s.status === 'active').length,
    seismicEvents: seismicData.length,
    avgMagnitude: Number(
      (seismicData.reduce((acc, curr) => acc + curr.magnitude, 0) / (seismicData.length || 1)).toFixed(2)
    ),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here`s what`s happening with your geophysical surveys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Surveys"
          value={stats.totalSurveys}
          icon={FileText}
          trend={12}
          color="blue"
        />
        <StatsCard
          title="Active Surveys"
          value={stats.activeSurveys}
          icon={Activity}
          trend={8}
          color="green"
        />
        <StatsCard
          title="Seismic Events"
          value={stats.seismicEvents}
          icon={MapPin}
          trend={-3}
          color="purple"
        />
        <StatsCard
          title="Avg Magnitude"
          value={stats.avgMagnitude}
          icon={TrendingUp}
          trend={5}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SurveyChart seismicData={seismicData} />
        <RecentActivity surveys={surveys} seismicData={seismicData} />
      </div>
    </div>
  );
}