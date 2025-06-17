import { usePersonStore } from '../store';

export const ItemOrderControl = () => {
  const { latestItemOrder, latestItemOrderCounter, setLatestItemOrder } = usePersonStore();

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(newOrder)) {
      setLatestItemOrder(newOrder);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 border-gray-200">
      <div className="flex items-center gap-2">
        <label htmlFor="itemOrder" className="text-lg font-medium text-gray-700">
          Current Item Order:
        </label>
        <input
          type="number"
          id="itemOrder"
          value={latestItemOrder}
          onChange={handleOrderChange}
          min="1"
          className="w-20 px-2 py-1 text-lg font-medium text-gray-700 border border-gray-200 rounded bg-white"
        />
      </div>
      <div className="text-sm text-gray-500">Items Added: {latestItemOrderCounter}</div>
    </div>
  );
};

export default ItemOrderControl;
