import { Survey } from '@/types';
import { MapPin, Calendar, Activity, Edit2, Trash2 } from 'lucide-react';

interface SurveyCardProps {
  survey: Survey;
  onEdit?: (survey: Survey) => void;
  onDelete?: (id: string) => void;
}

export default function SurveyCard({ survey, onEdit, onDelete }: SurveyCardProps) {
  const statusColors = {
    planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{survey.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{survey.description}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[survey.status]}`}>
            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
          </span>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={16} />
            <span>{survey.survey_type} Survey</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} />
            <span>{new Date(survey.start_date).toLocaleDateString()} - {new Date(survey.end_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Activity size={16} />
            <span>Created: {new Date(survey.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={() => onEdit(survey)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Edit2 size={14} />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(survey.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}