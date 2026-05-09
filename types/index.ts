export interface User {
  id: string;
  email: string;
  full_name: string;
  department: string;
  role: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  survey_type: 'seismic' | 'magnetic' | 'gravitational' | 'electrical';
  start_date: string;
  end_date: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SeismicData {
  id: string;
  survey_id: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  data: any;
  created_at: string;
}

export interface DashboardStats {
  totalSurveys: number;
  activeSurveys: number;
  seismicEvents: number;
  avgMagnitude: number;
}

export interface SurveyFormData {
  title: string;
  description: string;
  survey_type: 'seismic' | 'magnetic' | 'gravitational' | 'electrical';
  start_date: string;
  end_date: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  location: { type: 'Point'; coordinates: [number, number] };
  created_by?: string;
}

export interface USGSFeature {
  properties: {
    mag: number;
    time: number;
    place: string;
    url: string;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}