import React from 'react';
import { Heart, Footprints, Clock } from 'lucide-react';

const DailyProgress = () => {
  return (
    <div className="relative mb-8">
      <div className="card dark:bg-[#1E1E1E]/90">
        {/* Main Progress Circle */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-[#2D2D2D]"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="85"
                cx="96"
                cy="96"
              />
              <circle
                className="text-cyan-500"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 85}
                strokeDashoffset={2 * Math.PI * 85 * (1 - 0.6)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="85"
                cx="96"
                cy="96"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-cyan-500">0</span>
              <span className="text-xl text-gray-400">of 150</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Heart className="w-5 h-5 text-cyan-500" />
            <span className="text-gray-400">Heart Points</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">608</div>
            <div className="text-sm text-gray-400">Cal</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">0</div>
            <div className="text-sm text-gray-400">km</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">0</div>
            <div className="text-sm text-gray-400">Move Min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;