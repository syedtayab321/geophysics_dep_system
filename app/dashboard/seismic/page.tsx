'use client';

import { useState } from 'react';
import { useSurveys } from '@/lib/hooks/useSurveys';
import { Activity, MapPin, TrendingUp, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SeismicPage() {
  const { seismicData, addSeismicData } = useSurveys();
  const [loading, setLoading] = useState(false);

  const fetchExternalSeismicData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seismic?minMagnitude=2.5');
      const data = await response.json();
      
      for (const event of data) {
        await addSeismicData({
          survey_id: '00000000-0000-0000-0000-000000000000', // Demo survey ID
          magnitude: event.magnitude,
          depth: event.depth,
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          timestamp: new Date(event.timestamp).toISOString(),
          data: event,
        });
      }
      
      toast.success(`Added ${data.length} seismic events`);
    } catch (error) {
      toast.error('Failed to fetch seismic data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Seismic Data</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time seismic event monitoring and analysis
          </p>
        </div>
        <button
          onClick={fetchExternalSeismicData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Fetch Live Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Total Events</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{seismicData.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-purple-600" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Avg Magnitude</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {(seismicData.reduce((acc, d) => acc + d.magnitude, 0) / (seismicData.length || 1)).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-green-600" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Active Regions</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {new Set(seismicData.map(d => `${d.latitude.toFixed(1)},${d.longitude.toFixed(1)}`)).size}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Magnitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Depth (km)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {seismicData.slice(0, 20).map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      event.magnitude > 5 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      event.magnitude > 3 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {event.magnitude}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{event.depth}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.latitude.toFixed(2)}°, {event.longitude.toFixed(2)}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}