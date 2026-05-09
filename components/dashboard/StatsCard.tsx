import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }: StatsCardProps) {
  const colorConfig = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', trendUp: 'text-green-600', trendDown: 'text-red-600' },
    green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', trendUp: 'text-green-600', trendDown: 'text-red-600' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', trendUp: 'text-green-600', trendDown: 'text-red-600' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', trendUp: 'text-green-600', trendDown: 'text-red-600' },
    red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', trendUp: 'text-green-600', trendDown: 'text-red-600' },
  };

  const colors = colorConfig[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend >= 0 ? colors.trendUp : colors.trendDown} flex items-center gap-1`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colors.bg} ${colors.text}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}