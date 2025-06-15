import { Person } from './Person';
import { usePersonStore } from '../store';

export const PersonList = () => {
  const { persons, addPerson, removePerson, getNumbersTotal } = usePersonStore();

  const handleAddPerson = () => {
    const id = crypto.randomUUID();
    const personCount = Object.keys(persons).length + 1;
    addPerson(id, `Person ${personCount}`);
  };

  const grandTotal = Object.keys(persons).reduce((sum, id) => sum + getNumbersTotal(id), 0);

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

      <div className="text-center text-2xl font-semibold text-indigo-600 py-4 px-4 bg-gray-100 rounded-lg mb-8 shadow-sm">
        Grand Total: {grandTotal.toLocaleString()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {Object.entries(persons).map(([id, person]) => (
          <div 
            key={id} 
            className={`relative bg-white p-6 pl-12 rounded-lg shadow-sm ${
              person.earliestConfirmedNumberIndex !== null ? 'bg-blue-100 border-2 border-red-500' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => removePerson(id)}
              className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center bg-red-100 text-red-500 rounded text-xl leading-none transition-colors hover:bg-red-200"
            >
              ×
            </button>
            <Person id={id} initialName={person.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonList; 