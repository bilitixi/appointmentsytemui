import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      method: "get",
      url: "http://127.0.0.1:8000/doctors/",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
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
      await axios.delete(
        `http://127.0.0.1:8000/doctors/${doctorId}/`,
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
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
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
                        onClick={() => handleDelete(doctor.id)}
                      >
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