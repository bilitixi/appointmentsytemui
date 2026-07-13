import React, { useEffect, useState } from "react";
import api from "../api";
import PageLoader, { ButtonSpinner } from "../Components/LoadingSpinner";

function ViewAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        api.get('/appointments/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((response) => {
            setAppointments(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    function cancelAppointment(id) {

        const token = localStorage.getItem("token");

        setCancellingId(id);
        api.delete(`/appointments/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(() => {

            setAppointments(prev =>
                prev.filter(app => app.id !== id)

            );
            alert("Appointment cancelled successfully");

        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setCancellingId(null);
        });
    }

    // Loading state
    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="container mt-5">

            {/* IF APPOINTMENTS EXIST */}
            {appointments.length > 0 ? (

                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Appointments</h2>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">
                                    <tr>
                                        <th>Patient</th>
                                        <th>Date and Time</th>
                                        <th>Status</th>
                                        <th>Doctor</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {appointments.map((appointment) => (

                                        <tr key={appointment.id}>

                                            {/* Patient name */}
                                            <td>
                                                {appointment.patient_name}
                                            </td>

                                            {/* Date + time */}
                                            <td>
                                                {appointment.slot_info.date} {" "}
                                                {appointment.slot_info.start_time} - {" "}
                                                {appointment.slot_info.end_time}
                                            </td>

                                            {/* Status */}
                                            <td>
                                                {appointment.status === "confirmed" && (
                                                    <span className="badge bg-success">
                                                        Booked
                                                    </span>
                                                )}

                                                {appointment.status === "pending" && (
                                                    <span className="badge bg-info">
                                                        Pending
                                                    </span>
                                                )}


                                            </td>

                                            {/* Doctor */}
                                            <td>
                                                {appointment.status === "confirmed"
                                                    ? appointment.doctor_name
                                                    : "Allocating Doctor, Please wait..."
                                                }
                                            </td>

                                            {/* Actions */}
                                            <td className="text-end">

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    disabled={cancellingId === appointment.id}
                                                    onClick={() => cancelAppointment(appointment.id)}
                                                >
                                                    {cancellingId === appointment.id && <ButtonSpinner />}
                                                    Cancel
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    </div>
                </>

            ) : (

                // EMPTY STATE
                <div
                    className="container d-flex justify-content-center align-items-center"
                    style={{ minHeight: "80vh" }}
                >
                    <div className="text-center">

                        <div className="mb-4">
                            <i
                                className="bi bi-calendar-x"
                                style={{ fontSize: "4rem", color: "#6c757d" }}
                            />
                        </div>

                        <h3 className="mb-3">No Appointments Yet</h3>

                        <p className="text-muted mb-4">
                            You haven't booked any appointments. Start by scheduling one now.
                        </p>

                    </div>
                </div>

            )}

        </div>
    );
}

export default ViewAppointments;