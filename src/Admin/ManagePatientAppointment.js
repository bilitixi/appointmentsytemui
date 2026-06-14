import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

function ManagePatientAppointments() {
  const { id } = useParams();
  const {firstName} = useParams();
  const {lastName} = useParams();


  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/appointments/?patient_id=${id}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadAppointments();
  }, [id]);

  const deleteAppointment = async (appointmentId) => {
    const confirmDelete = window.confirm("Cancel this appointment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/appointments/${appointmentId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{firstName} {lastName}'s Appointments</h2>

        <Link
          to={`/managepatients/manageappointments/add/${id}`}
          className="btn btn-secondary btn-sm"
        >
          Add Appointment
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered align-middle">

            <thead className="table-dark">
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Last Update</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                      [...appointments]
                        .sort(
                          (a, b) =>
                            new Date(a.slot_info?.date) - new Date(b.slot_info?.date)
                        )
                        .map((appointment) => (
                          <tr key={appointment.id}>

                            {/* Doctor */}
                            <td>{appointment.doctor_name}</td>

                            {/* Date */}
                            <td>{appointment.slot_info?.date}</td>

                            {/* Time */}
                            <td>
                              {appointment.slot_info?.start_time?.slice(0, 5)} -{" "}
                              {appointment.slot_info?.end_time?.slice(0, 5)}
                            </td>

                            {/* Last Update */}
                            <td>{appointment.updated_at.slice(0, 10)}</td>

                            {/* Status */}
                            <td>{appointment.status}</td>


                    {/* Actions */}
                    <td>
                      <Link
                        to={`/managepatients/manageappointments/edit/${appointment.id}/${appointment.slot_info?.appointmentslotID}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          deleteAppointment(appointment.id)
                        }
                      >
                        Cancel
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No appointments found
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

export default ManagePatientAppointments;