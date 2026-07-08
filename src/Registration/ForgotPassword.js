import React from 'react';
import { useState } from "react";
import { Link } from "react-router";
import api from "../api";

function ForgotPassword() {

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            const response = await api.post(
                "/forgot_password/",
                { username }
            );

            setMessage(response.data.message);
            setSubmitted(true);

        }
        catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    }

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        {/* Header */}
                        <div className="card-header text-center bg-dark text-white">

                            <h4>Forgot Password</h4>

                        </div>

                        {/* Body */}
                        <div className="card-body">

                            {submitted ? (

                                <>
                                    <div className="alert alert-success">
                                        {message}
                                    </div>

                                    <Link
                                        to="/login"
                                        className="btn btn-primary w-100"
                                    >
                                        Back to Login
                                    </Link>
                                </>

                            ) : (

                                <form onSubmit={handleSubmit}>

                                    <p>
                                        Enter your account email and we'll
                                        send you a link to reset your
                                        password.
                                    </p>

                                    {error && (

                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}

                                    <div className="mb-3">

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                    >
                                        Send Reset Link
                                    </button>

                                </form>
                            )}

                            <hr />

                            <p className="text-center mb-0">

                                <Link to="/login">
                                    Back to Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;
