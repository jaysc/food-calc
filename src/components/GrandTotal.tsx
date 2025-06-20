import { useState } from 'react';
import { usePersonStore } from '../store';
import GrandItemTotal from './GrandItemTotal';

export const GrandTotal = () => {
  const persons = usePersonStore((state) => state.persons);
  const addPerson = usePersonStore((state) => state.addPerson);
  const getItemsTotal = usePersonStore((state) => state.getItemsTotal);

  const [showConfirm, setShowConfirm] = useState(false);

  const grandTotal = Object.keys(persons).reduce((sum, id) => sum + getItemsTotal(id), 0);

  const handleAddPerson = () => {
    addPerson();
  };

  const handleReset = () => {
    if (showConfirm) {
      // Clear localStorage
      localStorage.removeItem('food-calc-storage');
      // Reload the page to reset all state
      window.location.reload();
    } else {
      setShowConfirm(true);
      // Reset confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center text-2xl font-semibold text-indigo-600 py-2 px-4 bg-gray-100 rounded-lg mb-2 shadow-sm">
        Grand Total: {grandTotal.toLocaleString()}
      </div>
      <GrandItemTotal />
      <div className=" flex justify-center">
        <button
          type="button"
          onClick={handleAddPerson}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-base font-medium transition-colors"
        >
          Add Person
        </button>
      </div>
      <button
        type="button"
        onClick={handleReset}
        className={`px-6 py-2 rounded text-base font-medium transition-colors ${
          showConfirm
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        {showConfirm ? 'Confirm?' : 'Reset All'}
      </button>
    </div>
  );
};

export default GrandTotal;
