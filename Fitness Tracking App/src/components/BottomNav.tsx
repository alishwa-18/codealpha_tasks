import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ClipboardList, LayoutGrid, UserCircle } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E]/80 backdrop-blur-lg border-t border-gray-800/50">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/') ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link
          to="/journal"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/journal') ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-xs">Journal</span>
        </Link>
        
        <Link
          to="/browse"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/browse') ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-xs">Browse</span>
        </Link>
        
        <Link
          to="/profile"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/profile') ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <UserCircle className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}