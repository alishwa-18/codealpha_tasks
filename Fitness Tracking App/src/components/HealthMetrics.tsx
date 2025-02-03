import React, { useState } from 'react';
import { TrendingUp, Activity, Info } from 'lucide-react';

interface DayData {
  day: string;
  calories: number;
  steps: number;
  date: string;
}

const HealthMetrics = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Sample data for the last 7 days
  const weekData: DayData[] = [
    { day: 'S', calories: 520, steps: 6800, date: '2024-02-25' },
    { day: 'M', calories: 680, steps: 8200, date: '2024-02-26' },
    { day: 'T', calories: 750, steps: 9100, date: '2024-02-27' },
    { day: 'W', calories: 608, steps: 7500, date: '2024-02-28' },
    { day: 'T', calories: 820, steps: 10200, date: '2024-02-29' },
    { day: 'F', calories: 710, steps: 8800, date: '2024-03-01' },
    { day: 'S', calories: 608, steps: 7400, date: '2024-03-02' },
  ];

  const maxCalories = Math.max(...weekData.map(d => d.calories));

  return (
    <div className="space-y-4 mb-8">
      <div className="card dark:bg-[#1E1E1E]/90">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Weight</h2>
            <span className="text-gray-400">10 Nov 2024 - 1 Feb 2025</span>
          </div>
          <button className="p-2 rounded-full bg-[#2D2D2D]">
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-400">47<span className="text-2xl">kg</span></div>
          <span className="text-gray-400">32 sec ago</span>
        </div>
        
        <div className="h-32 bg-[#2D2D2D] rounded-lg"></div>
      </div>

      <div className="card dark:bg-[#1E1E1E]/90">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Energy expended</h2>
            <span className="text-gray-400">Last 7 days</span>
          </div>
          <button className="p-2 rounded-full hover:bg-[#2D2D2D] transition-colors group">
            <Info className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="text-4xl font-bold text-blue-400">608<span className="text-2xl">Cal</span></div>
          <span className="text-gray-400">Today</span>
        </div>
        
        <div className="relative h-48">
          {/* Graph grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-full border-t border-gray-800/50"
                style={{ top: `${(i * 25)}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex justify-between items-end px-2">
            {weekData.map((data, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-12"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === index && (
                  <div className="absolute -top-20 w-36 p-3 bg-[#2D2D2D] rounded-lg shadow-lg z-10">
                    <div className="text-sm text-gray-400">{new Date(data.date).toLocaleDateString()}</div>
                    <div className="font-semibold text-white">{data.calories} Calories</div>
                    <div className="text-sm text-gray-400">{data.steps.toLocaleString()} Steps</div>
                  </div>
                )}

                {/* Bar */}
                <div 
                  className={`w-8 rounded-t-lg transition-all duration-300 ${
                    hoveredBar === index ? 'bg-blue-400' : 'bg-blue-500/60'
                  }`}
                  style={{ 
                    height: `${(data.calories / maxCalories) * 100}%`,
                  }}
                />
                <span className={`text-sm mt-2 transition-colors duration-300 ${
                  hoveredBar === index ? 'text-white' : 'text-gray-400'
                }`}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute -left-12 inset-y-0 flex flex-col justify-between text-xs text-gray-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {Math.round((maxCalories / 4) * (4 - i))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;