import './index.css';
import { PersonList } from './components/PersonList';
import { PriceInput } from './components/PriceInput';
import { usePersonStore } from './store';
import GrandTotal from './components/GrandTotal';

export function App() {
  const { addPerson } = usePersonStore();

  const handleAddPerson = () => {
    addPerson();
  };

  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-4xl font-bold mb-4">Person Counter App</h1>
      <div className="bg-white mb-2 py-2 rounded-lg shadow-sm flex items-center justify-center gap-4">
        <div className=" flex justify-center">
          <button
            type="button"
            onClick={handleAddPerson}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-base font-medium transition-colors"
          >
            Add Person
          </button>
        </div>
        <PriceInput />
      </div>
      <PersonList />
      <GrandTotal />
    </div>
  );
}

export default App;
