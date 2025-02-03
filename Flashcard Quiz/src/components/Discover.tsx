import React, { useState } from 'react';
import { Heart, Moon, Navigation, X, ChevronRight } from 'lucide-react';

interface RecommendationContent {
  title: string;
  content: React.ReactNode;
}

const Discover = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationContent | null>(null);

  const recommendations = {
    health: {
      title: "Heart Points Guide",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Understanding Heart Points</h3>
          <p className="text-gray-400">
            Heart Points are earned through activities that get your heart pumping. The more intense the activity, the more points you earn.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-white">How to earn Heart Points:</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Moderate activities (1 point/minute): Brisk walking, yoga</li>
              <li>Vigorous activities (2 points/minute): Running, HIIT, swimming</li>
              <li>Strength training (varies): Weight lifting, bodyweight exercises</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg">
            <p className="text-blue-400">
              WHO recommends earning at least 150 Heart Points per week for better health.
            </p>
          </div>
        </div>
      )
    },
    sleep: {
      title: "Sleep Quality Guide",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Optimizing Your Sleep</h3>
          <p className="text-gray-400">
            Quality sleep is essential for recovery, muscle growth, and overall health.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-white">Sleep recommendations:</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Aim for 7-9 hours of sleep per night</li>
              <li>Maintain a consistent sleep schedule</li>
              <li>Create a dark, quiet, and cool sleeping environment</li>
              <li>Avoid screens 1 hour before bedtime</li>
              <li>Limit caffeine intake after 2 PM</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg">
            <p className="text-purple-400">
              Track your sleep patterns to identify areas for improvement.
            </p>
          </div>
        </div>
      )
    },
    walking: {
      title: "Paced Walking Guide",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Effective Paced Walking</h3>
          <p className="text-gray-400">
            Paced walking is a simple yet effective way to improve cardiovascular health and burn calories.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-white">Walking pace guidelines:</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Casual: 2-3 mph - Easy conversation possible</li>
              <li>Brisk: 3-4 mph - Slightly breathless but can talk</li>
              <li>Power: 4-5 mph - Breathing hard, conversation difficult</li>
            </ul>
          </div>

          <div className="p-4 bg-cyan-500/10 rounded-lg">
            <p className="text-cyan-400">
              Start with 10 minutes and gradually increase duration and pace.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">DISCOVER</h2>
      
      <div className="space-y-4">
        <div className="card dark:bg-gray-800/90">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Heart className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">A simple way to stay healthy</h3>
              <p className="text-gray-400 mt-1">
                Heart Points help you see which activities are best for your health, and how you're performing against World Health Organization recommendations
              </p>
              <button 
                className="text-blue-500 hover:text-blue-400 transition-colors mt-2 flex items-center space-x-1"
                onClick={() => setSelectedRecommendation(recommendations.health)}
              >
                <span>See recommendations</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="card dark:bg-gray-800/90">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Moon className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">How much sleep you need</h3>
              <p className="text-gray-400 mt-1">
                Learn which factors affect sleep needs, and how to find the right amount for you
              </p>
              <button 
                className="text-blue-500 hover:text-blue-400 transition-colors mt-2 flex items-center space-x-1"
                onClick={() => setSelectedRecommendation(recommendations.sleep)}
              >
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="card dark:bg-gray-800/90">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Navigation className="w-6 h-6 text-cyan-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Set a pace for your walks</h3>
              <p className="text-gray-400 mt-1">
                Follow along with the beat to turn walking into a simple, effective way to exercise
              </p>
              <button 
                className="text-blue-500 hover:text-blue-400 transition-colors mt-2 flex items-center space-x-1"
                onClick={() => setSelectedRecommendation(recommendations.walking)}
              >
                <span>Try paced walking</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedRecommendation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">{selectedRecommendation.title}</h2>
              <button 
                onClick={() => setSelectedRecommendation(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedRecommendation.content}
            </div>

            <button
              className="w-full btn-primary mt-6"
              onClick={() => setSelectedRecommendation(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;