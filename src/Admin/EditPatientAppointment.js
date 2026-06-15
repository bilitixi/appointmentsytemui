import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api";

function EditPatientAppointment() {
  const { appointmentSlotID } = useParams();
  const { patientID } = useParams();
  const navigate = useNavigate();

  // mode state
  const isEditMode = !!appointmentSlotID;

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    start_time: "",
    end_time: "",
    speciality: "",
  });

  const [lastUpdate, setLastUpdate] = useState("");

  function parseErrors(error) {
    const data = error.response?.data;

    if (!data) return ["Something went wrong"];

    if (Array.isArray(data)) return data;

    return Object.entries(data).flatMap(([field, messages]) => messages);
  }

  // Load doctors list
  useEffect(() => {
    api
      .get("/doctors/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ONLY load appointment if edit mode
  useEffect(() => {
    if (!isEditMode) return;

    api
      .get(
        `/appointment_slots/${appointmentSlotID}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
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
  }, [appointmentSlotID, isEditMode]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // POST (add) OR PUT (edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    const request = isEditMode
      ? api.put(
          `/appointment_slots/${appointmentSlotID}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
      : api.post(
          `/book_appointment_for_patient/${patientID}`,
          formData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

    request
      .then(() => {
        alert(
          isEditMode
            ? "Appointment updated successfully"
            : "Appointment created successfully"
        );
        navigate(-1);
      })
      .catch((err) => {
        const error = parseErrors(err);
        alert(error);
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        {/*  Dynamic Title */}
        <h3 className="mb-2">
          {isEditMode ? "Edit Patient Appointment" : "Add Patient Appointment"}
        </h3>

        {/*  Only show last update in edit mode */}
        {isEditMode && (
          <h6 className="text-muted mb-4">
            Last Update: {lastUpdate?.slice(0, 10)}
          </h6>
        )}

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
            {isEditMode ? "Update Slot" : "Create Slot"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPatientAppointment;