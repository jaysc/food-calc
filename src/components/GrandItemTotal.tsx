import { usePersonStore } from '../store';

export const GrandItemTotal = () => {
  const persons = usePersonStore((state) => state.persons);
  const totalItems = Object.values(persons).reduce((sum, person) => sum + person.items.length, 0);

  return (
    <div className="text-center text-xl font-semibold text-indigo-600 py-2 px-4 bg-gray-100 rounded-lg mb-2 shadow-sm">
      Grand Item Total: {totalItems}
    </div>
  );
};

export default GrandItemTotal;
