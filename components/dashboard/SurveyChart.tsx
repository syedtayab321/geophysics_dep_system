'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SeismicData } from '@/types';
import { useState } from 'react';

interface SurveyChartProps {
  seismicData: SeismicData[];
}

export default function SurveyChart({ seismicData }: SurveyChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const chartData = seismicData.slice(0, 10).map(data => ({
    date: new Date(data.timestamp).toLocaleDateString(),
    magnitude: data.magnitude,
    depth: data.depth,
  })).reverse();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seismic Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recent seismic events</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              chartType === 'line' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              chartType === 'bar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Bar
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#F3F4F6'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="magnitude" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="depth" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#F3F4F6'
              }} 
            />
            <Legend />
            <Bar dataKey="magnitude" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="depth" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}