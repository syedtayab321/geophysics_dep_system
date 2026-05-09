import { useEffect } from 'react';
import { useSurveyStore } from '../store/surveyStore';

export function useSurveys() {
  const {
    surveys,
    currentSurvey,
    seismicData,
    isLoading,
    fetchSurveys,
    fetchSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    fetchSeismicData,
    addSeismicData,
  } = useSurveyStore();
  
  useEffect(() => {
    fetchSurveys();
    fetchSeismicData();
  }, [fetchSurveys, fetchSeismicData]);
  
  return {
    surveys,
    currentSurvey,
    seismicData,
    isLoading,
    fetchSurveys,
    fetchSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    fetchSeismicData,
    addSeismicData,
  };
}