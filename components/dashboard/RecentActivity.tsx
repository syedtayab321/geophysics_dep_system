import { Survey, SeismicData } from '@/types';
import { Calendar, MapPin, Activity, Clock } from 'lucide-react';

interface RecentActivityProps {
  surveys: Survey[];
  seismicData: SeismicData[];
}

export default function RecentActivity({ surveys, seismicData }: RecentActivityProps) {
  const recentSurveys = surveys.slice(0, 3);
  const recentEvents = seismicData.slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recent Surveys</h4>
          {recentSurveys.map((survey) => (
            <div key={survey.id} className="flex items-start gap-3 mb-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{survey.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{survey.survey_type} Survey</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>{new Date(survey.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recent Seismic Events</h4>
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3 mb-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Activity size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Magnitude {event.magnitude}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Depth: {event.depth}km</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{new Date(event.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}