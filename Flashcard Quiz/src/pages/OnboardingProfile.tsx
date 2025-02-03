import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import { updateUserProfile } from '../services/userService';

interface UserData {
  name: string;
  gender: string;
  birthday: string;
  height: { feet: string; inches: string };
  weight: string;
}

const initialUserData: UserData = {
  name: '',
  gender: '',
  birthday: '',
  height: { feet: '5', inches: '0' },
  weight: ''
};

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile: updateAuthProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuthSuccess = () => {
    setStep(2);
  };

  const handleNext = async () => {
    if (step === 3) {
      setLoading(true);
      setError(null);
      
      try {
        if (!currentUser) {
          throw new Error('No authenticated user found');
        }

        // First update Firebase Auth profile
        await updateAuthProfile(userData.name);
        
        // Then update Firestore profile
        const heightInInches = (parseInt(userData.height.feet) * 12) + parseInt(userData.height.inches);
        await updateUserProfile(currentUser.uid, {
          displayName: userData.name,
          height: heightInInches,
          weight: parseFloat(userData.weight),
          birthDate: userData.birthday,
          gender: userData.gender,
          isProfileComplete: true,
        });

        // Navigate to dashboard after successful update
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error completing profile setup:', error);
        setError('Failed to complete profile setup. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 2:
        return userData.name && userData.gender && userData.birthday;
      case 3:
        return userData.height.feet && userData.height.inches && userData.weight;
      default:
        return true;
    }
  };

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            type="text"
            className="input-primary"
            value={userData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Gender</label>
          <select
            className="input-primary"
            value={userData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Birthday</label>
          <input
            type="date"
            className="input-primary"
            value={userData.birthday}
            onChange={(e) => handleInputChange('birthday', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderBodyMeasurementsStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Body Measurements</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Height</label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  value={userData.height.feet}
                  onChange={(e) => handleInputChange('height', { ...userData.height, feet: e.target.value })}
                  min="1"
                  max="8"
                  className="input-primary pr-12"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ft</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  value={userData.height.inches}
                  onChange={(e) => handleInputChange('height', { ...userData.height, inches: e.target.value })}
                  min="0"
                  max="11"
                  className="input-primary pr-12"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">in</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Weight</label>
          <div className="relative">
            <input
              type="number"
              className="input-primary pr-12"
              value={userData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="Enter your weight"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">kg</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to FitFlow</h1>
          <p className="text-gray-400">Let's get you started</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <div className="space-y-4">
              <AuthForm isSignUp={isSignUp} onSuccess={handleAuthSuccess} />
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 text-sm hover:text-blue-300 transition-colors w-full text-center"
              >
                {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && renderBasicInfoStep()}
        {step === 3 && renderBodyMeasurementsStep()}

        {step > 1 && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`btn-primary flex items-center space-x-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || !isStepValid()}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>{step === 3 ? 'Complete Setup' : 'Continue'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === step ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}