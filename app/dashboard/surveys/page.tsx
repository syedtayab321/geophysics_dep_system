'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SurveyList from '@/components/surveys/SurveyList';
import SurveyForm from '@/components/surveys/SurveyForm';
import { useSurveys } from '@/lib/hooks/useSurveys';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Survey, SurveyFormData } from '@/types';
import toast from 'react-hot-toast';

export default function SurveysPage() {
  const { surveys, isLoading, createSurvey, deleteSurvey, updateSurvey } = useSurveys();
  const [showForm, setShowForm] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

 const handleCreateSurvey = async (data: SurveyFormData) => {
  try {
    await createSurvey({ ...data, created_by: 'current_user_id' });
    toast.success('Survey created successfully!');
    setShowForm(false);
  } catch (error) {
    toast.error('Failed to create survey');
  }
};

  const handleUpdateSurvey = async (data: SurveyFormData) => {
    if (editingSurvey) {
      try {
        await updateSurvey(editingSurvey.id, data);
        toast.success('Survey updated successfully!');
        setEditingSurvey(null);
        setShowForm(false);
      } catch (error) {
        toast.error('Failed to update survey');
      }
    }
  };

  const handleDeleteSurvey = async (id: string) => {
    if (confirm('Are you sure you want to delete this survey?')) {
      try {
        await deleteSurvey(id);
        toast.success('Survey deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete survey');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Geophysical Surveys</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor all geophysical survey projects
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
        >
          <Plus size={20} />
          New Survey
        </button>
      </div>

      <SurveyList 
        surveys={surveys} 
        onEdit={(survey) => {
          setEditingSurvey(survey);
          setShowForm(true);
        }}
        onDelete={handleDeleteSurvey}
      />

      {showForm && (
        <SurveyForm
          onSubmit={editingSurvey ? handleUpdateSurvey : handleCreateSurvey}
          onClose={() => {
            setShowForm(false);
            setEditingSurvey(null);
          }}
          initialData={editingSurvey || undefined}
        />
      )}
    </div>
  );
}