'use client';

import Link from 'next/link';
import { Waves, Map, Activity, BarChart3, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
              <Waves size={20} />
              <span className="text-sm font-medium">Geophysics Department</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Advanced Geophysical
              <span className="text-blue-600 dark:text-blue-400"> Survey Management</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive platform for managing seismic surveys, analyzing geophysical data, 
              and visualizing earth science analytics in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage geophysical surveys and seismic data analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Map,
              title: "Survey Management",
              description: "Create, track, and manage geophysical surveys with real-time status updates."
            },
            {
              icon: Activity,
              title: "Seismic Monitoring",
              description: "Real-time seismic data visualization and earthquake monitoring system."
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description: "Comprehensive analytics and reporting tools for data-driven decisions."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}