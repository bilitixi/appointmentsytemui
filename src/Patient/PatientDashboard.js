import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router";
import api from "../api";
import PageLoader from "../Components/LoadingSpinner";

function PatientDashboard(props) {
    const [patient, setPatient] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


     useEffect(() => {

        const token = localStorage.getItem("token");

        api.get("/patients/", {
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
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    if (loading) return <PageLoader />;

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

                {/* My Account */}
                <div className="col-md-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                My Account
                            </h5>

                            <p className="card-text">
                                Update your details or manage your account.
                            </p>

                            <Link
                                to="/myAccount"
                                className="btn btn-secondary"
                            >
                                My Account
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default PatientDashboard;