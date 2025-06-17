import { usePersonStore } from '../store';

const values = [500, 200, 100, 50, 30, 20, 10];

export const PriceQuickAdd = () => {
  const addToGlobalNumber = usePersonStore((state) => state.addToGlobalNumber);
  const isNumberConfirmed = usePersonStore((state) => state.isNumberConfirmed);

  return (
    <div className="flex gap-2 mt-2 justify-center flex-wrap">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          disabled={isNumberConfirmed}
          onClick={() => addToGlobalNumber(v)}
          className={`px-3 py-1 rounded text-base font-medium border border-gray-300 bg-gray-100 hover:bg-indigo-100 transition-colors text-black ${isNumberConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {v}
        </button>
      ))}
    </div>
  );
};
