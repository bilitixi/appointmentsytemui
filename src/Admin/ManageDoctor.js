import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api";
import PageLoader, { ButtonSpinner } from "../Components/LoadingSpinner";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };

    api
      .get("/doctors/", config)
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    try {
      setDeletingId(doctorId);
      await api.delete(
        `/doctors/${doctorId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Doctor deleted successfully");
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Doctor Management</h2>

        <Link to="/managedoctors/add" className="btn btn-primary">
          + Add Doctor
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Doctor Name</th>
                <th>Specialty</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <tr key={doctor.id}>
                    <td>{index + 1}</td>
                    <td>
                      {doctor.firstName} {doctor.lastName}
                    </td>
                    <td>{doctor.speciality}</td>

                    <td className="text-center">
                      <Link
                        to={`/managedoctors/edit/${doctor.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm me-2"
                        disabled={deletingId === doctor.id}
                        onClick={() => handleDelete(doctor.id)}
                      >
                        {deletingId === doctor.id && <ButtonSpinner />}
                        Delete
                      </button>

                      <Link
                        to={`/managedoctors/manageDoctorSlots/${doctor.id}`}
                        className="btn btn-info btn-sm"
                      >
                        Manage Appointment Slots
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No doctors found.
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

export default ManageDoctors;