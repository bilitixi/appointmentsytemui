import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
