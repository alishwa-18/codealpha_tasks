import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import OnboardingProfile from './pages/OnboardingProfile';
import BottomNav from './components/BottomNav';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
    </div>;
  }

  if (!currentUser) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function MainApp() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="bg-[#1E1E1E]/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Dumbbell className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                FitFlow
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/onboarding" 
          element={
            currentUser ? 
              <Navigate to="/" replace /> : 
              <OnboardingProfile />
          } 
        />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;