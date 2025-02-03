import React from 'react';
import { Users as UsersIcon } from 'lucide-react';

function Users() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <p className="text-gray-600 mb-4">
          This feature will be available in a future update.
        </p>
      </div>
    </div>
  );
}

export default Users;