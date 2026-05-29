import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Login from './Registration/Login';
import Register from './Registration/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navigation";
import Options from "./Components/Options";
import PatientDashboard from "./Patient/PatientDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Error from "./Components/Error";
import ViewDoctors from "./Patient/ViewDoctors";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <BrowserRouter>
      <Navigation/>


      <Routes>
          <Route path="/" element={<Options/>} />
          <Route path="/error" element={<Error/>} />

          <Route path="/patientDashboard" element={
              <ProtectedRoute>
              <PatientDashboard/>
              </ProtectedRoute>}>
          </Route>

          <Route path="/viewdoctors" element={
              <ProtectedRoute>
              <ViewDoctors/>
              </ProtectedRoute>}/>


          <Route path="/adminDashboard" element={
              <ProtectedRoute>
              <AdminDashboard/>
              </ProtectedRoute>} />


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
