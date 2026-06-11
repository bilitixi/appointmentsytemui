import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

function EditPatientAppointment() {
  const { appointmentSlotID } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    start_time: "",
    end_time: "",
    speciality: "",
  });

  const [lastUpdate, setLastUpdate] = useState("");

  //Load doctors list
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/doctors/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  //  Load appointment data (edit mode)
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/appointment_slots/${appointmentSlotID}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;

        setFormData({
          doctor: data.doctor,
          date: data.date || "",
          start_time: data.start_time || "",
          end_time: data.end_time || "",
          speciality: data.speciality || "",
        });

        setLastUpdate(data.updated_at);
      })
      .catch((err) => console.log(err));
  }, [appointmentSlotID]);

  //  Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

    });
  };

  //  Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://127.0.0.1:8000/appointment_slots/${appointmentSlotID}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )

      .then(() =>
          alert("Appointment updated successfully"),
          navigate(-1))
      .catch((err) => console.log(err));

  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        {/* Title */}
        <h3 className="mb-2">Edit Patient Appointment</h3>

        {/* Last Update */}
        <h6 className="text-muted mb-4">
          Last Update: {lastUpdate?.slice(0, 10)}
        </h6>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Doctor Dropdown */}
          <div className="mb-3">
            <label className="form-label">Doctor</label>

            <select
              name="doctor"
              className="form-control"
              value={formData.doctor}
              onChange={handleChange}
            >
              <option value="">No Doctor Assigned</option>

              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Start Time */}
          <div className="mb-3">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              name="start_time"
              className="form-control"
              value={formData.start_time}
              onChange={handleChange}
            />
          </div>

          {/* End Time */}
          <div className="mb-3">
            <label className="form-label">End Time</label>
            <input
              type="time"
              name="end_time"
              className="form-control"
              value={formData.end_time}
              onChange={handleChange}
            />
          </div>

          {/* Speciality */}
          <div className="mb-3">
            <label className="form-label">Speciality</label>
            <input
              type="text"
              name="speciality"
              className="form-control"
              value={formData.speciality}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Update Slot
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditPatientAppointment;