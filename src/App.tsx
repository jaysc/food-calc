import './index.css';
import { PersonList } from './components/PersonList';
import { PriceInput } from './components/PriceInput';

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-4xl font-bold mb-8">Person Counter App</h1>
      <PriceInput />
      <PersonList />
    </div>
  );
}

export default App;
