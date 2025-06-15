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
    <div className="person-list">
      <div className="add-person-section">
        <button type="button" onClick={handleAddPerson} className="add-button">
          Add Person
        </button>
      </div>

      <div className="grand-total">
        Grand Total: {grandTotal}
      </div>

      <div className="persons-container">
        {Object.entries(persons).map(([id, person]) => (
          <div key={id} className="person-wrapper">
            <button
              type="button"
              onClick={() => removePerson(id)}
              className="remove-button"
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