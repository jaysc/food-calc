import { usePersonStore } from '../store';

export const GlobalNumber = () => {
  const { globalNumber, isNumberConfirmed, setGlobalNumber, confirmNumber, resetNumber } = usePersonStore();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, '');
    // Only allow numbers
    if (/^-?\d*$/.test(value)) {
      setGlobalNumber(value === '' ? 0 : Number.parseInt(value, 10));
    }
  };

  const formattedNumber = globalNumber.toLocaleString();

  return (
    <div className="global-number">
      <label htmlFor="global-number" className="global-number-label">
        Global Number:
      </label>
      <input
        id="global-number"
        type="text"
        value={formattedNumber}
        onChange={handleNumberChange}
        className={`global-number-input ${isNumberConfirmed ? 'confirmed' : ''}`}
        placeholder="Enter a number"
        disabled={isNumberConfirmed}
      />
      <div className="global-number-actions">
        {!isNumberConfirmed ? (
          <button
            type="button"
            onClick={confirmNumber}
            className="confirm-button"
            disabled={globalNumber <= 0}
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={resetNumber}
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default GlobalNumber; 