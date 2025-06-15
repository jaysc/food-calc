import { useEffect } from 'react';
import { usePersonStore } from '../store';

interface PersonProps {
  id: string;
  initialName: string;
}

export const Person = ({ id, initialName }: PersonProps) => {
  const {
    persons,
    setName,
    getNumbersTotal,
    isNumberConfirmed,
    globalNumber,
    addNumber,
    removeLastConfirmedNumber,
    removeNumberAtIndex,
    toggleShowNumbers,
    removePerson,
  } = usePersonStore();

  const person = persons[id];

  // Set initial name when component mounts
  useEffect(() => {
    if (person && person.name !== initialName) {
      setName(id, initialName);
    }
  }, [id, initialName, person, setName]);

  if (!person) return null;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(id, event.target.value);
  };

  const numbersTotal = getNumbersTotal(id);
  const hasNumbers = person.numbers.length > 0;

  return (
    <div className={`relative p-6 pl-12 rounded-lg shadow-sm ${
      person.earliestConfirmedNumberIndex !== null
        ? 'bg-blue-100 border-2 border-red-500'
        : 'bg-white border-2 border-gray-200'
    }`}>
      <button
        type="button"
        onClick={() => removePerson(id)}
        className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center bg-red-100 text-red-500 rounded text-xl leading-none transition-colors hover:bg-red-200"
      >
        ×
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-between">
          <input
            type="text"
            value={person.name}
            onChange={handleNameChange}
            placeholder={`Person ${person.index}`}
            className="flex-1 px-2 py-2 border border-gray-200 rounded text-base text-gray-800 bg-white"
          />
          <div className="flex items-center gap-2">
            {isNumberConfirmed && hasNumbers && person.earliestConfirmedNumberIndex !== null && (
              <button
                type="button"
                onClick={() => removeLastConfirmedNumber(id)}
                className="px-2 py-1 bg-indigo-600 text-white rounded text-base transition-colors hover:bg-indigo-700 min-w-8"
              >
                -
              </button>
            )}
            {isNumberConfirmed && globalNumber !== null && (
              <button
                type="button"
                onClick={() => addNumber(id, globalNumber)}
                className="px-2 py-1 bg-indigo-600 text-white rounded text-base transition-colors hover:bg-indigo-700 min-w-8"
              >
                +
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="text-right text-lg font-medium text-indigo-600 px-2 py-2 bg-gray-100 rounded">
              Total: {numbersTotal.toLocaleString()}
            </div>
            <button
              type="button"
              onClick={() => toggleShowNumbers(id)}
              className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-base transition-colors hover:bg-gray-300 min-w-8 flex items-center justify-center"
            >
              {person.showNumbers ? '▼' : '▶'}
            </button>
          </div>
          {person.showNumbers && (
            <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded border border-gray-200">
              {person.numbers.map((number, index) => (
                <div
                  key={`${id}-${number.value}-${index}`}
                  className="flex items-center justify-between gap-2 px-2 py-1 bg-white rounded border border-gray-200 text-gray-600"
                >
                  <span className="flex-1">{number.value.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => removeNumberAtIndex(id, index)}
                    className="px-1.5 py-0.5 bg-red-100 text-red-500 rounded text-base transition-colors hover:bg-red-200 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Person;
