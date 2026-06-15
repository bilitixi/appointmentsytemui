import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../api";

function AppointmentSlotForm() {
  const navigate = useNavigate();
  const { slotid, doctorid } = useParams();
  const [doctorID, setDoctorID] = useState()

  const [slot, setSlot] = useState({
    date: "",
    start_time: "",
    end_time: "",
    speciality: "",
    doctor: doctorid


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

    setSlot({
      ...slot,
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
      if (slotid) {
        // Update slot
        await api.put(
          `/appointment_slots/${slotid}/`,
          slot,
          config
        );
         alert("Slot updated successfully");
         navigate(`/managedoctors/manageDoctorSlots/${doctorID}`);
      } else {
        // Create slot
        await api.post(
          "/appointment_slots/",
          slot,
          config
        );
        alert("Slot created successfully");
        navigate(`/managedoctors/manageDoctorSlots/${doctorID}`);
      }


    } catch (error) {
      console.error(error);
      const errors = parseErrors(error);
      alert(errors.join("\n"));
    }
  };

  useEffect(() => {
    if (!slotid) {
        setDoctorID(doctorid)
        return;

    }

    const loadSlot = async () => {
      try {
        const response = await api.get(
          `/appointment_slots/${slotid}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        setSlot(response.data);
        setDoctorID(response.data.doctor);
      } catch (error) {
        console.error(error);
      }
    };

    loadSlot();
  }, [slotid,doctorid]);

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">
            {slotid ? "Update Slot" : "Add Slot"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={slot.date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Speciality</label>
                <input
                  type="text"
                  name="speciality"
                  className="form-control"
                  value={slot.speciality}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  name="start_time"
                  className="form-control"
                  value={slot.start_time}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  name="end_time"
                  className="form-control"
                  value={slot.end_time}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-4 d-flex justify-content-between">
              <Link
                to={`/managedoctors/manageDoctorSlots/${doctorID}`}
                className="btn btn-secondary"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
              >
                {slotid ? "Update" : "Save"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSlotForm;