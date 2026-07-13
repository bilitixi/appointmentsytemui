import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router";
import api from "../api";
import PageLoader, { ButtonSpinner } from "../Components/LoadingSpinner";

function ManagePatient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadPatients = useCallback(async () => {
    try {
      const response = await api.get(
        "/patients/",
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
  });

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await api.delete(
        `/patients/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      await loadPatients();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Patient Management</h2>

        <Link
          to="/managepatients/upload/"
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
                        disabled={deletingId === patient.id}
                        onClick={() =>
                          deletePatient(patient.id)
                        }
                      >
                        {deletingId === patient.id && <ButtonSpinner />}
                        Delete
                      </button>

                      <Link
                        to={`/managepatients/manageappointments/${patient.id}/${patient.firstName}/${patient.lastName}`}
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