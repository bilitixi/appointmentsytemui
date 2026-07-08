import React from 'react';
import { useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api";

function ResetPassword() {

    const { token } = useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setErrors([]);

        if (newPassword !== confirmPassword) {

            setErrors(["Passwords do not match"]);

            return;
        }

        try {

            const response = await api.post(
                "/reset_password/",
                { token, new_password: newPassword }
            );

            setSuccess(true);
            console.log(response.data.message);

        }
        catch (error) {

            const data = error.response?.data;
            const message = data?.message;

            if (Array.isArray(message)) {

                setErrors(message);

            }
            else if (message) {

                setErrors([message]);

            }
            else {

                setErrors(["Something went wrong. Please try again."]);
            }
        }
    }

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        {/* Header */}
                        <div className="card-header text-center bg-dark text-white">

                            <h4>Reset Password</h4>

                        </div>

                        {/* Body */}
                        <div className="card-body">

                            {success ? (

                                <>
                                    <div className="alert alert-success">
                                        Password reset successfully
                                    </div>

                                    <Link
                                        to="/login"
                                        className="btn btn-primary w-100"
                                    >
                                        Go to Login
                                    </Link>
                                </>

                            ) : (

                                <form onSubmit={handleSubmit}>

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

                                    <div className="mb-3">

                                        <label className="form-label">
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Confirm New Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                    >
                                        Reset Password
                                    </button>

                                </form>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;
