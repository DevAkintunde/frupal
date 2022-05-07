import "./App.css";
import { Authorization } from "./package/modules/Authorization";
import { Test } from "./package/modules/test/Test";

function App() {
  const imported = (
    <div>
      <Test />
    </div>
  );

  return (
    <div className="App">
      <h1>Frupal Previewer</h1>
      <Authorization app={imported} />
    </div>
  );
}

export default App;
