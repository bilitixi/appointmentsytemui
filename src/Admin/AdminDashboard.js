import React from 'react';
import {Link} from "react-router";

function AdminDashboard(props) {


    return (

    <div className="container py-5">
      <h2 className="text-center mb-5">
        Admin Dashboard - Manage System
      </h2>

      <div className="row g-4">
        {/* Manage Doctors */}
        <div className="col-md-6">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Doctors</h5>
              <p className="card-text">
                Add, edit, and delete doctor profiles and slots.
              </p>
              <Link to="/managedoctors" className="btn btn-primary">
                Manage Doctors
              </Link>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="col-md-6">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Patients</h5>
              <p className="card-text">
                View and manage patient user accounts and appointments.
              </p>
              <Link to="/managepatients" className="btn btn-danger">
                Manage Patients
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default AdminDashboard;