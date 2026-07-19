import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import PageLoader, { ButtonSpinner } from "../Components/LoadingSpinner";

function MyAccount() {
    const navigate = useNavigate();

    const [patientId, setPatientId] = useState(null);
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        date_of_birth: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    function parseErrors(error) {
        const data = error.response?.data;

        if (!data) return ["Something went wrong"];

        if (Array.isArray(data)) {
            return data;
        }

        return Object.entries(data).flatMap(([field, messages]) => {
            return messages;
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        api.get("/patients/", {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((response) => {
            const me = response.data[0];
            setPatientId(me.id);
            setPatient({
                firstName: me.firstName || "",
                lastName: me.lastName || "",
                phone: me.phone || "",
                date_of_birth: me.date_of_birth || "",
                address: me.address || "",
            });
        })
        .catch((error) => {
            console.error(error);
            navigate("/error");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [navigate]);

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        };

        try {
            setSubmitting(true);
            await api.patch(`/patients/${patientId}/`, patient, config);
            alert("Details updated successfully");
        } catch (error) {
            const errors = parseErrors(error);
            alert(errors.join("\n"));
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This is permanent and cannot be undone."
        );

        if (!confirmed) return;

        const config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        };

        try {
            setDeleting(true);
            await api.delete(`/patients/${patientId}/`, config);
            localStorage.removeItem("token");
            alert("Your account has been deleted");
            navigate("/login");
        } catch (error) {
            const errors = parseErrors(error);
            alert(errors.join("\n"));
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <PageLoader />;

    return (
        <div className="container py-5">
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3 className="mb-4">My Account</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={patient.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={patient.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={patient.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className="form-control"
                                    value={patient.date_of_birth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <textarea
                                    name="address"
                                    className="form-control"
                                    rows="3"
                                    value={patient.address}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="mt-4 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting && <ButtonSpinner />}
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div className="card border-danger shadow-sm">
                <div className="card-body">
                    <h5 className="card-title text-danger">Danger Zone</h5>

                    <p className="card-text">
                        Deleting your account is permanent and cannot be undone. All of your
                        appointments will be cancelled and your login access will be revoked.
                    </p>

                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                        disabled={deleting}
                    >
                        {deleting && <ButtonSpinner />}
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
