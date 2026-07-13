import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { ButtonSpinner } from "./LoadingSpinner";

function Options() {

    const navigate = useNavigate();
    const [loadingRole, setLoadingRole] = useState(null);

    async function handleSelection(selectedRole) {

        try {
            setLoadingRole(selectedRole);

            const response = await api.get("/me/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            });

            const isStaff = response.data.is_staff;

            // backend role
            const userRole = isStaff ? "admin" : "patient";

            // compare with clicked option
            if (userRole === selectedRole) {
                if (userRole === "admin") {
                    navigate("/adminDashboard");
                } else {
                    navigate("/patientDashboard");
                }
            } else {
                navigate("/error");
            }

        } catch (error) {
            console.log(error);
            navigate("/login");
        } finally {
            setLoadingRole(null);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center"
             style={{ height: "100vh", background: "#f8f9fa" }}>

            <div className="text-center p-5 shadow rounded bg-white"
                 style={{ maxWidth: "500px", width: "100%" }}>

                <h1 className="mb-3">Piki Ora Medical Centre</h1>

                <p className="text-muted mb-4">
                    Please select your portal to continue
                </p>

                <div className="d-grid gap-3">

                    <button
                        className="btn btn-primary btn-lg"
                        disabled={loadingRole !== null}
                        onClick={() => handleSelection("patient")}
                    >
                        {loadingRole === "patient" && <ButtonSpinner />}
                        Patient Dashboard
                    </button>

                    <button
                        className="btn btn-dark btn-lg"
                        disabled={loadingRole !== null}
                        onClick={() => handleSelection("admin")}
                    >
                        {loadingRole === "admin" && <ButtonSpinner />}
                        Admin Dashboard
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Options;