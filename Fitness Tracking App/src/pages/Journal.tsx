import React, { useState } from 'react';
import { ClipboardList, Plus, X } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  type: string;
  notes: string;
}

export default function Journal() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    type: '',
    notes: ''
  });

  const handleAddEntry = () => {
    if (newEntry.type && newEntry.notes) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        type: newEntry.type,
        notes: newEntry.notes
      };
      setEntries([entry, ...entries]);
      setNewEntry({ type: '', notes: '' });
      setShowNewEntry(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Journal</h1>
        <button 
          className="btn-primary flex items-center space-x-2"
          onClick={() => setShowNewEntry(true)}
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {showNewEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">New Journal Entry</h2>
              <button 
                onClick={() => setShowNewEntry(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Type</label>
                <select
                  className="input-primary w-full"
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                >
                  <option value="">Select type</option>
                  <option value="Workout">Workout</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Progress">Progress</option>
                  <option value="Recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                <textarea
                  className="input-primary w-full h-32 resize-none"
                  placeholder="Write your notes here..."
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                ></textarea>
              </div>

              <button
                className="btn-primary w-full"
                onClick={handleAddEntry}
                disabled={!newEntry.type || !newEntry.notes}
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="card dark:bg-gray-800/90">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-400">
                    {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString()}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">{entry.type}</h3>
                  <p className="text-gray-400 mt-2">{entry.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 mt-12">
          <div className="p-4 bg-[#2D2D2D] rounded-full">
            <ClipboardList className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">Start Your Fitness Journal</h2>
          <p className="text-gray-400 text-center">
            Track your workouts, nutrition, and progress
          </p>
        </div>
      )}
    </div>
  );
}