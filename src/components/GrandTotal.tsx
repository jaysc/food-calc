import { usePersonStore } from '../store';

export const GrandTotal = () => {
  const { persons, getNumbersTotal } = usePersonStore();

  const grandTotal = Object.keys(persons).reduce((sum, id) => sum + getNumbersTotal(id), 0);

  return (
    <div className="text-center text-2xl font-semibold text-indigo-600 py-4 px-4 bg-gray-100 rounded-lg mb-8 shadow-sm">
      Grand Total: {grandTotal.toLocaleString()}
    </div>
  );
};

export default GrandTotal;
