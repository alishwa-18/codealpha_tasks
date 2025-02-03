import React from 'react';
import { Info } from 'lucide-react';

const WeeklyGoals = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="space-y-4 mb-8">
      <div className="card dark:bg-[#1E1E1E]/90">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Your daily goals</h2>
          <span className="text-gray-400">Last 7 days</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-4xl font-bold text-blue-400">0/7</span>
            <div className="text-gray-400">Achieved</div>
          </div>
          
          <div className="flex space-x-4">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#2D2D2D] mb-1"></div>
                <span className="text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card dark:bg-[#1E1E1E]/90">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Your weekly target</h2>
            <span className="text-gray-400">26 Jan - 1 Feb</span>
          </div>
          <Info className="text-gray-400 w-5 h-5" />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-cyan-500">0</span>
            <span className="text-gray-400">of 150</span>
          </div>
          <div className="h-2 bg-[#2D2D2D] rounded-full">
            <div className="h-full w-0 bg-cyan-500 rounded-full"></div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm">
          Scoring 150 Heart Points a week can help you live longer, sleep better and boost your mood
        </p>
      </div>
    </div>
  );
};

export default WeeklyGoals;