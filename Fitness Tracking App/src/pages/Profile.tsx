import React from 'react';
import { ChevronDown, Moon, Sun, LogOut, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileField {
  id: string;
  label: string;
  value: string | number;
  type?: string;
}

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const activityGoals: ProfileField[] = [
    { id: 'steps', label: 'Steps', value: 5000 },
    { id: 'heart-points', label: 'Heart Points', value: 20 },
  ];

  const bedtimeSchedule: ProfileField[] = [
    { id: 'bedtime', label: 'Get in bed', value: '11:00 pm' },
    { id: 'wakeup', label: 'Wake up', value: '7:00 am' },
  ];

  const aboutYou: ProfileField[] = [
    { id: 'gender', label: 'Gender', value: 'Female' },
    { id: 'birthday', label: 'Birthday', value: '18-Oct-2005' },
    { id: 'weight', label: 'Weight', value: '47 kg' },
    { id: 'height', label: 'Height', value: "5'1\"" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/onboarding');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderField = ({ id, label, value, type = 'text' }: ProfileField) => (
    <div key={id} className="flex-1">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <div className="flex items-center justify-between p-3 bg-[#2D2D2D] rounded-lg">
        <span className="text-white">{value}</span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="pb-20 space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Email Display */}
      <div className="card dark:bg-[#1E1E1E]/90">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Mail className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <div className="text-white">{currentUser?.email}</div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Activity goals</h2>
        <div className="grid grid-cols-2 gap-4">
          {activityGoals.map(renderField)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Bedtime schedule</h2>
          <div className="w-12 h-6 bg-[#2D2D2D] rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {bedtimeSchedule.map(renderField)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">About you</h2>
        <div className="grid grid-cols-2 gap-4">
          {aboutYou.map(renderField)}
        </div>
      </section>

      {/* Sign Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-2 p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}