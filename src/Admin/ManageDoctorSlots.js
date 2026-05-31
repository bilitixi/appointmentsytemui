import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

function ManageDoctorSlots() {
  const { id } = useParams();

  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSlots();
  }, [id]);

  const loadSlots = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/doctor_slots/${id}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ FIX: API returns array
      setDoctorData(response.data?.[0] || null);
    } catch (error) {
      console.error(error);
      setDoctorData(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlot = async (slotId) => {
    if (!window.confirm("Delete this slot?")) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/appointment_slots/${slotId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      loadSlots();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!doctorData) return <h3>No data found</h3>;

  const groupedSlots = doctorData.grouped_slots || {};

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Doctor Appointment Slots</h2>

      <div className="card mb-4 shadow-sm p-3">
        {/* Doctor Header */}
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            Dr {doctorData.doctor.firstName}{" "}
            {doctorData.doctor.lastName}
          </h4>

          <Link
            to={`/doctors/${doctorData.doctor.id}/slots/add`}
            className="btn btn-primary btn-sm"
          >
            + Add Slot
          </Link>
        </div>

        <hr />

        {/* Grouped Slots */}
        {Object.keys(groupedSlots).length === 0 ? (
          <p className="text-muted">No slots found</p>
        ) : (
          Object.entries(groupedSlots).map(([date, slots]) => (
            <div key={date}>
              <h6 className="mt-3 text-muted">{date}</h6>

              <ul className="list-group mb-3">
                {slots.map((slot) => (
                  <li
                    key={slot.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {/* Time */}
                    <div>
                      <strong>{slot.start_time}</strong> -{" "}
                      {slot.end_time}
                    </div>

                    {/* Status + Actions */}
                    <div className="d-flex align-items-center gap-3">
                      {slot.is_booked ? (
                        <span className="badge bg-danger">
                          Booked
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          Free
                        </span>
                      )}

                      <div>
                        <Link
                          to={`/slots/edit/${slot.id}`}
                          className="btn btn-info btn-sm me-2"
                        >
                          Update
                        </Link>

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => deleteSlot(slot.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageDoctorSlots;