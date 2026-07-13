import React from 'react';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api";
import PageLoader, { ButtonSpinner } from "../Components/LoadingSpinner";

function VerifyEmail() {
    const { token } = useParams();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    const [resendEmail, setResendEmail] = useState("");
    const [resendStatus, setResendStatus] = useState("");
    const [resending, setResending] = useState(false);

    useEffect(() => {

        api.post(`/verify_email/${token}/`)
            .then((response) => {

                setStatus("success");
                setMessage(response.data.message);

            })
            .catch((error) => {

                setStatus("error");
                setMessage(
                    error.response?.data?.message ||
                    "This verification link is invalid or has already been used."
                );
            });

    }, [token]);

    async function handleResend(e) {

        e.preventDefault();

        setResendStatus("");

        try {

            setResending(true);

            const response = await api.post(
                "/resend_verification_email/",
                { username: resendEmail }
            );

            setResendStatus(response.data.message);

        }
        catch (error) {

            setResendStatus(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
        finally {
            setResending(false);
        }
    }

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        {/* Header */}
                        <div className="card-header text-center bg-dark text-white">

                            <h4>Email Verification</h4>

                        </div>

                        {/* Body */}
                        <div className="card-body">

                            {status === "loading" && (
                                <PageLoader text="Verifying your email..." />
                            )}

                            {status === "success" && (

                                <>
                                    <div className="alert alert-success">
                                        {message}
                                    </div>

                                    <Link
                                        to="/login"
                                        className="btn btn-primary w-100"
                                    >
                                        Go to Login
                                    </Link>
                                </>
                            )}

                            {status === "error" && (

                                <>
                                    <div className="alert alert-danger">
                                        {message}
                                    </div>

                                    <p>
                                        Enter your email to request a new
                                        verification link.
                                    </p>

                                    <form onSubmit={handleResend}>

                                        <div className="mb-3">

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={resendEmail}
                                                onChange={(e) =>
                                                    setResendEmail(e.target.value)
                                                }
                                            />

                                        </div>

                                        {resendStatus && (

                                            <div className="alert alert-info">
                                                {resendStatus}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn btn-success w-100"
                                            disabled={resending}
                                        >
                                            {resending && <ButtonSpinner />}
                                            Resend Verification Email
                                        </button>

                                    </form>
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default VerifyEmail;
