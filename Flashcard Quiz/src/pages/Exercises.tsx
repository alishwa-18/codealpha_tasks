import React, { useState } from 'react';
import { Plus, Search, Filter, ChevronRight, BarChart2 } from 'lucide-react';

type Exercise = {
  name: string;
  category: string;
  primaryMuscle: string;
  personalRecord: number;
  lastWeight: number;
  sets: string;
};

function Exercises() {
  const [exercises] = useState<Exercise[]>([
    {
      name: 'Barbell Bench Press',
      category: 'Chest',
      primaryMuscle: 'Pectoralis Major',
      personalRecord: 100,
      lastWeight: 90,
      sets: '4x8'
    },
    {
      name: 'Deadlift',
      category: 'Back',
      primaryMuscle: 'Lower Back',
      personalRecord: 160,
      lastWeight: 150,
      sets: '3x5'
    },
    {
      name: 'Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      personalRecord: 140,
      lastWeight: 130,
      sets: '5x5'
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Exercises</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your lifts and personal records</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Exercise</span>
        </button>
      </div>

      <div className="card dark:bg-gray-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exercises..."
              className="input-primary pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Exercise</th>
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">PR</th>
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Last</th>
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Sets</th>
                <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Progress</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {exercises.map((exercise) => (
                <tr key={exercise.name} className="group">
                  <td className="py-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{exercise.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.primaryMuscle}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {exercise.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-semibold text-gray-800 dark:text-white">{exercise.personalRecord} kg</span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-600 dark:text-gray-400">{exercise.lastWeight} kg</span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-600 dark:text-gray-400">{exercise.sets}</span>
                  </td>
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-orange-500">
                      <BarChart2 className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="py-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
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

export default Exercises;