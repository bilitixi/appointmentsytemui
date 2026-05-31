import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

function DoctorForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // will exist when editing


  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date_of_birth: "",
    address: "",
    speciality: "",
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };

    try {
      if (id) {
        // Update existing doctor
        await axios.put(
          `http://127.0.0.1:8000/doctors/${id}/`,
          doctor,
          config
        );
        alert("Doctor updated successfully");
      } else {
        // Create new doctor
        await axios.post(
          "http://127.0.0.1:8000/doctors/",
          doctor,
          config
        );
         alert("Doctor created successfully");
      }


      navigate("/managedoctors");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  if (!id) return; // Add mode, don't load anything

  const loadDoctor = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/doctors/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      setDoctor(response.data);
    } catch (error) {
      console.error(error);

    }
  };

  loadDoctor();
}, [id]);

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">
            {id ? "Edit Doctor" : "Add Doctor"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={doctor.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={doctor.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={doctor.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  value={doctor.date_of_birth}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={doctor.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Speciality</label>
                <input
                  type="text"
                  name="speciality"
                  className="form-control"
                  value={doctor.speciality}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-between">
              <Link
                to="/managedoctors"
                className="btn btn-secondary"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
              >
                {id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorForm;