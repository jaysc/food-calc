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
    removePerson
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
    <div className="person">
      <div className="person-header">
        <input
          type="text"
          value={person.name}
          onChange={handleNameChange}
          placeholder="Enter name"
          className="name-input"
        />
        <div className="counter-section">
          {isNumberConfirmed && hasNumbers && person.earliestConfirmedNumberIndex !== null && (
            <button 
              type="button" 
              onClick={() => removeLastConfirmedNumber(id)} 
              className="counter-button"
            >
              -
            </button>
          )}
          {isNumberConfirmed && (
            <button 
              type="button" 
              onClick={() => addNumber(id, globalNumber)} 
              className="counter-button"
            >
              +
            </button>
          )}
        </div>
      </div>
      <div className="numbers-section">
        <div className="numbers-header">
          <div className="numbers-total">
            Total: {numbersTotal.toLocaleString()}
          </div>
          <button 
            type="button" 
            onClick={() => toggleShowNumbers(id)}
            className="dropdown-button"
          >
            {person.showNumbers ? '▼' : '▶'}
          </button>
        </div>
        {person.showNumbers && (
          <div className="numbers-list">
            {person.numbers.map((number, index) => (
              <div key={`${id}-${number.value}-${index}`} className="number-item">
                <span className="number-value">{number.value.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => removeNumberAtIndex(id, index)}
                  className="delete-number-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Person;
