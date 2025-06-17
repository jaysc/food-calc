import { PriceQuickAdd } from './PriceQuickAdd';
import { PriceInputField } from './PriceInputField';

export const PriceInput = () => {
  return (
    <div className="flex flex-col items-center gap-1 px-4">
      <PriceInputField />
      <PriceQuickAdd />
    </div>
  );
};

export default PriceInput;
