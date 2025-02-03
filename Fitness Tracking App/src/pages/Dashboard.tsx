import React from 'react';
import DailyProgress from '../components/DailyProgress';
import WeeklyGoals from '../components/WeeklyGoals';
import HealthMetrics from '../components/HealthMetrics';
import Discover from '../components/Discover';
import AIWorkoutRecommendations from '../components/AIWorkoutRecommendations';

function Dashboard() {
  return (
    <div className="space-y-8">
      <DailyProgress />
      <WeeklyGoals />
      <HealthMetrics />
      <Discover />
      <AIWorkoutRecommendations />
    </div>
  );
}

export default Dashboard;