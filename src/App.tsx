import './index.css';
import { PersonList } from './components/PersonList';
import { PriceInput } from './components/PriceInput';
import GrandTotal from './components/GrandTotal';

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-4xl font-bold mb-4">Person Counter App</h1>
      <div className="bg-white mb-2 py-2 rounded-lg shadow-sm flex items-center justify-center gap-4">

        <PriceInput />
      </div>
      <PersonList />
      <GrandTotal />
    </div>
  );
}

export default App;
