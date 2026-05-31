import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function ManagePatient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/patients/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/patients/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      loadPatients();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Patient Management</h2>

        <Link
          to="/managepatients/add/"
          className="btn btn-primary"
        >
          + Create Patient
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date Of Birth</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={patient.id}>
                    <td>{index + 1}</td>

                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>

                    <td>{patient.dateOfBirth}</td>

                    <td className="text-center">
                      <Link
                        to={`/managepatients/edit/${patient.id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() =>
                          deletePatient(patient.id)
                        }
                      >
                        Delete
                      </button>

                      <Link
                        to={`/managepatients/manageappointments/${patient.id}`}
                        className="btn btn-sm btn-info"
                      >
                        Manage Appointments
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-muted"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagePatient;