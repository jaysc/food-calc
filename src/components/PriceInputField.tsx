import { usePersonStore } from '../store';

export const PriceInputField = () => {
  const { globalNumber, isNumberConfirmed, setGlobalNumber, confirmNumber, resetNumber } =
    usePersonStore();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGlobalNumber(value === '' ? null : Number.parseInt(value, 10));
  };

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <label htmlFor="price" className="text-lg font-medium text-gray-800 whitespace-nowrap">
        Price:
      </label>
      <input
        id="price"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        value={globalNumber ?? ''}
        onChange={handleNumberChange}
        className={`px-2 py-2 border border-gray-200 rounded text-base text-gray-800 bg-white w-[150px] focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 ${
          isNumberConfirmed
            ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600'
            : ''
        }`}
        placeholder="Enter a number"
        disabled={isNumberConfirmed}
      />
      <div className="flex items-center gap-2">
        {!isNumberConfirmed ? (
          <button
            type="button"
            onClick={confirmNumber}
            className={`px-4 py-3 rounded text-sm transition-colors ${
              globalNumber === null || globalNumber <= 0
                ? 'bg-gray-400 cursor-not-allowed opacity-70'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            disabled={globalNumber === null || globalNumber <= 0}
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={resetNumber}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
