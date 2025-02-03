import React, { useState } from 'react';
import { Plus, Search, Calendar, Dumbbell, Clock, ChevronRight } from 'lucide-react';

type Workout = {
  date: string;
  name: string;
  type: string;
  duration: number;
  volume: number;
  sets: number;
};

function Workouts() {
  const [workouts] = useState<Workout[]>([
    { date: '2024-01-28', name: 'Full Body Strength', type: 'Strength', duration: 45, volume: 2450, sets: 12 },
    { date: '2024-01-25', name: 'Upper Body', type: 'Strength', duration: 35, volume: 1850, sets: 9 },
    { date: '2024-01-23', name: 'Leg Day', type: 'Strength', duration: 50, volume: 3200, sets: 15 },
    { date: '2024-01-20', name: 'Push Day', type: 'Strength', duration: 40, volume: 2100, sets: 10 },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Workouts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your training sessions</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Workout</span>
        </button>
      </div>

      <div className="card dark:bg-gray-800 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="input-primary pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.date} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 text-white rounded-xl">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{workout.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{workout.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration} min</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{workout.sets} sets</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">{workout.volume.toLocaleString()} kg</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;