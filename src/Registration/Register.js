import React from 'react';

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";

function Register() {
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        username: "",
        password: "",
        patient_firstName: "",
        patient_lastName: "",
        patient_phone: "",
        patient_date_of_birth: "",
        patient_address: ""

    });

    const [errors, setErrors] = useState([]);

    function handleChange(e) {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });
    }

    async function handleSubmit(e) {


        e.preventDefault();

        setErrors([]);
         if (formData.password !== confirmPassword) {

            setErrors(["Passwords do not match"]);

            return;
        }

        try {

            await api.post(
                "/register/",
                formData
            );

            alert("Registration successful");

            navigate("/login");

        }
        catch(error) {

            console.log(error);

            let errorList = [];

            if (error.response?.data) {

                const data = error.response.data;

                Object.keys(data).forEach((field) => {

                    data[field].forEach((message) => {

                        errorList.push(
                            `${field}: ${message}`
                        );
                    });
                });
            }

            setErrors(errorList);
        }
    }

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-6">

                    <div className="card shadow">

                        {/* Header */}
                        <div className="card-header text-center bg-dark text-white">

                            <h4>Create an Account</h4>

                        </div>

                        {/* Body */}
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                {/* First Name */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        First Name

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="text"
                                            name="patient_firstName"
                                            className="form-control"
                                            value={formData.patient_firstName}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Last Name */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Last Name

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="text"
                                            name="patient_lastName"
                                            className="form-control"
                                            value={formData.patient_lastName}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Phone */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Phone Number

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="text"
                                            name="patient_phone"
                                            className="form-control"
                                            value={formData.patient_phone}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Address */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Address

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="text"
                                            name="patient_address"
                                            className="form-control"
                                            value={formData.patient_address}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* DOB */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Date Of Birth

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="date"
                                            name="patient_date_of_birth"
                                            className="form-control"
                                            value={formData.patient_date_of_birth}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Email */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Email

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="email"
                                            name="username"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Password */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Password

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3 row align-items-center">

                                    <label className="col-sm-3 col-form-label">

                                        Confirm Password

                                    </label>

                                    <div className="col-sm-9">

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }/>

                                    </div>

                                </div>

                                {/* Errors */}
                                {errors.length > 0 && (

                                    <div className="alert alert-danger">

                                        <ul className="mb-0">

                                            {errors.map((error, index) => (

                                                <li key={index}>
                                                    {error}
                                                </li>

                                            ))}

                                        </ul>

                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >

                                    Register

                                </button>

                            </form>

                            <hr />

                            {/* Login Link */}
                            <p className="text-center">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-1"
                                >
                                    Login here
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
