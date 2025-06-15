import { usePersonStore } from '../store';
import { GrandTotal } from './GrandTotal';
import { PersonGrid } from './PersonGrid';

export const PersonList = () => {
  const { addPerson } = usePersonStore();

  const handleAddPerson = () => {
    addPerson();
  };

  return (
    <div className="flex flex-col gap-8 text-gray-800">
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={handleAddPerson}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-base font-medium transition-colors"
        >
          Add Person
        </button>
      </div>

      <GrandTotal />
      <PersonGrid />
    </div>
  );
};

export default PersonList;
