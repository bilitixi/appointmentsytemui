import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router";

function PatientDashboard(props) {
    const [patient, setPatient] = useState('')
    const navigate = useNavigate()


     useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("http://127.0.0.1:8000/patients/", {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((response) => {

            console.log(response.data);

            // If API returns a single patient object
            setPatient(response.data[0]);

        })
        .catch((error) => {
            console.log(error);
            navigate("/error");
        });

    }, []);

    return (
        <div className="container py-5">

            <h2 className="text-center mb-5">
                Kia Ora {patient.firstName}, What would you like to do?
            </h2>

            <div className="row g-4">

                {/* Book Appointment */}
                <div className="col-md-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                Book Appointment
                            </h5>

                            <p className="card-text">
                                Schedule a new appointment with a doctor.
                            </p>

                            <Link
                                to="/bookAppointment"
                                className="btn btn-primary"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* View Doctors */}
                <div className="col-md-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                View Doctors
                            </h5>

                            <p className="card-text">
                                Browse available doctors and book an appointment.
                            </p>

                            <Link
                                to="/viewdoctors"
                                className="btn btn-success"
                            >
                                View Doctors
                            </Link>
                        </div>
                    </div>
                </div>

                {/* My Appointments */}
                <div className="col-md-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                My Appointments
                            </h5>

                            <p className="card-text">
                                Check your pending and booked appointments.
                            </p>

                            <Link
                                to="/viewAppointments"
                                className="btn btn-warning"
                            >
                                View Appointments
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default PatientDashboard;