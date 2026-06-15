import React, { useState } from "react";
import {useNavigate} from "react-router";
import api from "../api";

function BookAppointment() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        date: "",
        start_time: "",
        end_time: "",
        speciality: ""
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

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {

        event.preventDefault();

        const token = localStorage.getItem("token");

        api.post(
            "/appointment_slots/",
            formData,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        )
        .then((response) => {

            console.log(response.data);

            alert("Appointment requested successfully!");
            navigate("/patientDashboard");

        })
        .catch((error) => {
             const parsed = parseErrors(error);
             setErrors(parsed);



        });
    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            {/* Title */}
                            <h3 className="text-center mb-4">
                                Book Appointment
                            </h3>
                            {errors.length > 0 && (
                            <div className="alert alert-danger">
                                {errors.map((msg, index) => (
                                    <div key={index}>{msg}</div>
                                ))}
                            </div>)}


                            {/* Form */}
                            <form onSubmit={handleSubmit}>

                                {/* Date */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Select Date
                                    </label>

                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control"
                                        required
                                        min={today}
                                        value={formData.date}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* Start Time */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Start Time
                                    </label>

                                    <input
                                        type="time"
                                        name="start_time"
                                        className="form-control"
                                        required
                                        value={formData.start_time}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* End Time */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        End Time
                                    </label>

                                    <input
                                        type="time"
                                        name="end_time"
                                        className="form-control"
                                        required
                                        value={formData.end_time}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* Speciality */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Doctor Speciality
                                    </label>

                                    <select
                                        name="speciality"
                                        className="form-select"
                                        required
                                        value={formData.speciality}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            -- Select Speciality --
                                        </option>

                                        <option value="Cardiology">
                                            Cardiology
                                        </option>

                                        <option value="Dermatology">
                                            Dermatology
                                        </option>

                                        <option value="General">
                                            General
                                        </option>

                                        <option value="Pediatrics">
                                            Pediatrics
                                        </option>

                                    </select>

                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Book Appointment
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BookAppointment;