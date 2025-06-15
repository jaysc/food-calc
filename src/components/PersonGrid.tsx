import { Person } from './Person';
import { usePersonStore } from '../store';

export const PersonGrid = () => {
  const { persons, removePerson } = usePersonStore();

  return (
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
  );
};

export default PersonGrid; 