import React, { useState } from 'react';
import { Activity, Ruler, Heart, Apple, Moon, Circle, X, Check } from 'lucide-react';

interface Category {
  icon: any;
  name: string;
  color: string;
  description: string;
  metrics?: Array<{
    name: string;
    unit: string;
    type: 'number' | 'text' | 'select';
    options?: string[];
  }>;
}

const categories: Category[] = [
  { 
    icon: Activity, 
    name: 'Activity', 
    color: 'bg-emerald-500/20 text-emerald-500',
    description: 'Track your daily activities, workouts, and movement patterns',
    metrics: [
      { name: 'Steps', unit: 'steps', type: 'number' },
      { name: 'Distance', unit: 'km', type: 'number' },
      { name: 'Activity Type', unit: '', type: 'select', options: ['Walking', 'Running', 'Cycling', 'Swimming', 'Other'] }
    ]
  },
  { 
    icon: Ruler, 
    name: 'Body measurements', 
    color: 'bg-blue-500/20 text-blue-500',
    description: 'Monitor your body measurements and track your progress over time',
    metrics: [
      { name: 'Weight', unit: 'kg', type: 'number' },
      { name: 'Height', unit: 'cm', type: 'number' },
      { name: 'Body Fat', unit: '%', type: 'number' }
    ]
  },
  { 
    icon: Heart, 
    name: 'Vitals', 
    color: 'bg-red-500/20 text-red-500',
    description: 'Keep track of your heart rate, blood pressure, and other vital signs',
    metrics: [
      { name: 'Heart Rate', unit: 'bpm', type: 'number' },
      { name: 'Blood Pressure Systolic', unit: 'mmHg', type: 'number' },
      { name: 'Blood Pressure Diastolic', unit: 'mmHg', type: 'number' }
    ]
  },
  { 
    icon: Apple, 
    name: 'Nutrition', 
    color: 'bg-amber-500/20 text-amber-500',
    description: 'Log your meals, track calories, and monitor your nutrition goals',
    metrics: [
      { name: 'Calories', unit: 'kcal', type: 'number' },
      { name: 'Meal Type', unit: '', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
      { name: 'Notes', unit: '', type: 'text' }
    ]
  },
  { 
    icon: Moon, 
    name: 'Sleep', 
    color: 'bg-purple-500/20 text-purple-500',
    description: 'Monitor your sleep patterns, quality, and duration',
    metrics: [
      { name: 'Duration', unit: 'hours', type: 'number' },
      { name: 'Quality', unit: '', type: 'select', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
      { name: 'Notes', unit: '', type: 'text' }
    ]
  },
  { 
    icon: Circle, 
    name: 'Cycle tracking', 
    color: 'bg-pink-500/20 text-pink-500',
    description: 'Track your menstrual cycle and related symptoms',
    metrics: [
      { name: 'Flow Level', unit: '', type: 'select', options: ['Light', 'Medium', 'Heavy'] },
      { name: 'Symptoms', unit: '', type: 'text' },
      { name: 'Notes', unit: '', type: 'text' }
    ]
  },
];

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingData, setTrackingData] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartTracking = () => {
    // Here you would typically save the tracking data to your backend
    console.log('Tracking data:', trackingData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedCategory(null);
      setTrackingData({});
    }, 2000);
  };

  const handleInputChange = (metricName: string, value: string) => {
    setTrackingData(prev => ({
      ...prev,
      [metricName]: value
    }));
  };

  return (
    <div className="pb-20">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search health data"
            className="input-primary pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category)}
            className="w-full flex items-center space-x-4 p-4 rounded-xl bg-[#2D2D2D] hover:bg-[#363636] transition-colors"
          >
            <div className={`p-3 rounded-full ${category.color}`}>
              <category.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-white font-medium block">{category.name}</span>
              <span className="text-gray-400 text-sm">{category.description}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${selectedCategory.color}`}>
                  <selectedCategory.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">{selectedCategory.name}</h2>
              </div>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setTrackingData({});
                }}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {selectedCategory.metrics?.map((metric) => (
                <div key={metric.name}>
                  <label className="block text-sm text-gray-400 mb-1">
                    {metric.name} {metric.unit && `(${metric.unit})`}
                  </label>
                  {metric.type === 'select' ? (
                    <select
                      className="input-primary w-full"
                      value={trackingData[metric.name] || ''}
                      onChange={(e) => handleInputChange(metric.name, e.target.value)}
                    >
                      <option value="">Select {metric.name}</option>
                      {metric.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : metric.type === 'text' ? (
                    <textarea
                      className="input-primary w-full h-24 resize-none"
                      value={trackingData[metric.name] || ''}
                      onChange={(e) => handleInputChange(metric.name, e.target.value)}
                      placeholder={`Enter ${metric.name.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type="number"
                      className="input-primary w-full"
                      value={trackingData[metric.name] || ''}
                      onChange={(e) => handleInputChange(metric.name, e.target.value)}
                      placeholder={`Enter ${metric.name.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {showSuccess ? (
                <div className="flex items-center justify-center space-x-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-xl">
                  <Check className="w-5 h-5" />
                  <span>Successfully tracked!</span>
                </div>
              ) : (
                <>
                  <button 
                    className="btn-primary w-full"
                    onClick={handleStartTracking}
                  >
                    Start Tracking
                  </button>
                  <button 
                    className="w-full p-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => {
                      setSelectedCategory(null);
                      setTrackingData({});
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}