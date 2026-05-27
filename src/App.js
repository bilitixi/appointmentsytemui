import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Login from './Registration/Login';
import Register from './Registration/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
            {/* FOOTER */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">

          <p className="mb-0">
            © 2026 Piki Ora Medical Centre Management System
          </p>

        </footer>

     </BrowserRouter>



    </div>

  );
}

export default App;
