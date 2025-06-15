import { usePersonStore } from '../store';

export const PriceInput = () => {
  const { globalNumber, isNumberConfirmed, setGlobalNumber, confirmNumber, resetNumber } = usePersonStore();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, '');
    // Only allow numbers
    if (/^-?\d*$/.test(value)) {
      setGlobalNumber(value === '' ? null : Number.parseInt(value, 10));
    }
  };

  const formattedNumber = globalNumber === null ? '' : globalNumber.toLocaleString();

  return (
    <div className="price">
      <label htmlFor="price" className="price-label">
        Price:
      </label>
      <input
        id="price"
        type="text"
        value={formattedNumber}
        onChange={handleNumberChange}
        className={`price-input ${isNumberConfirmed ? 'confirmed' : ''}`}
        placeholder="Enter a number"
        disabled={isNumberConfirmed}
      />
      <div className="price-actions">
        {!isNumberConfirmed ? (
          <button
            type="button"
            onClick={confirmNumber}
            className="confirm-button"
            disabled={globalNumber === null || globalNumber <= 0}
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

export default PriceInput; 