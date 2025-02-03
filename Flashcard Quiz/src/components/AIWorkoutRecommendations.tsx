import React from 'react';
import { Brain, Dumbbell, Target, ChevronRight } from 'lucide-react';

interface WorkoutRecommendation {
  type: string;
  name: string;
  description: string;
  confidence: number;
  targetMuscles: string[];
}

const AIWorkoutRecommendations: React.FC = () => {
  const recommendations: WorkoutRecommendation[] = [
    {
      type: 'Strength',
      name: 'Progressive Overload Upper Body',
      description: 'Based on your recent chest and shoulder progress, this workout focuses on progressive overload for optimal muscle growth.',
      confidence: 92,
      targetMuscles: ['Chest', 'Shoulders', 'Triceps']
    },
    {
      type: 'Recovery',
      name: 'Active Recovery Session',
      description: 'Your recent training intensity suggests a need for an active recovery session to prevent overtraining.',
      confidence: 88,
      targetMuscles: ['Full Body', 'Core']
    },
    {
      type: 'Hypertrophy',
      name: 'Leg Hypertrophy Focus',
      description: 'Analysis shows potential for increased leg muscle growth with this targeted hypertrophy session.',
      confidence: 85,
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves']
    }
  ];

  return (
    <div className="card dark:bg-gray-800/90">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <button
            key={index}
            className="w-full p-4 bg-[#1E1E1E] rounded-xl hover:bg-[#2D2D2D] transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Dumbbell className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-white">{rec.name}</h3>
                  <span className="px-2 py-1 text-sm bg-blue-500/10 text-blue-500 rounded-full">
                    {rec.confidence}% Match
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {rec.targetMuscles.map((muscle, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-[#2D2D2D] text-blue-400 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIWorkoutRecommendations;