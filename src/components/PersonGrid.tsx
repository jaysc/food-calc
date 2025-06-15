import { usePersonStore } from '../store';
import { Person } from './Person';

export const PersonGrid = () => {
  const { persons } = usePersonStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {Object.entries(persons).map(([id, person]) => (
        <Person key={id} id={id} initialName={person.name} />
      ))}
    </div>
  );
};

export default PersonGrid;
