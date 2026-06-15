import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../api";

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date_of_birth: "",
    address: "",
  });
  function parseErrors(error) {

    const data = error.response?.data;

    if (!data) return ["Something went wrong"];

    // Case 1: array response
    if (Array.isArray(data)) {
        return data;
    }

    // Case 2: object response
    return Object.entries(data).flatMap(([field, messages]) => {
        return messages;
    });
}

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };



  useEffect(() => {
    if (id) {
        const loadPatient = async () => {
            try {
              const response = await api.get(
                `/patients/${id}/`,
                {
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }
              );

              setPatient(response.data);
            } catch (error) {

              console.error(error);
            }
          };
      loadPatient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const config = {
          headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
          },
      };


          try {
              await api.put(
                  `/patients/${id}/`,
                  patient,
                  config
              );
              alert("Patient updated successfully");
              navigate("/managepatients");
          } catch (error) {
              const errors = parseErrors(error);
              alert(errors.join("\n"));
              console.error(error);

          }



  }


  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">Edit Patient</h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={patient.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={patient.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={patient.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  value={patient.date_of_birth}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={patient.address}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-4 d-flex justify-content-between">
              <Link to="/managepatients" className="btn btn-secondary">
                Cancel
              </Link>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;