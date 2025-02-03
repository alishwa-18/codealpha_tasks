import React from 'react';
import { Plus } from 'lucide-react';

type Goal = {
  type: string;
  target: number;
  achieved: boolean;
};

function FitnessGoals() {
  const goals: Goal[] = [
    { type: 'Weight Loss', target: 5, achieved: true },
    { type: 'Muscle Gain', target: 3, achieved: false },
    { type: 'Flexibility', target: 2, achieved: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fitness Goals</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Fitness Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal.type} className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <div className="mt-1 text-lg font-semibold">{goal.type}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target</label>
                <div className="mt-1 text-lg font-semibold">{goal.target}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Achieved</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      goal.achieved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {goal.achieved ? 'Yes' : 'In Progress'}
                  </span>
                </div>
              </div>
              <button className="w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessGoals;