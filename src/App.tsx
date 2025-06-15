import "./index.css";
import "./components/styles.css";
import { PersonList } from "./components/PersonList";
import { GlobalNumber } from "./components/GlobalNumber";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-4xl font-bold mb-8">Person Counter App</h1>
      <GlobalNumber />
      <PersonList />
    </div>
  );
}

export default App;
