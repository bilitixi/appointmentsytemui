import React from "react";
import { useNavigate } from "react-router";
import api from "../api";

function Options() {

    const navigate = useNavigate();

    async function handleSelection(selectedRole) {

        try {

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
                        onClick={() => handleSelection("patient")}
                    >
                        Patient Dashboard
                    </button>

                    <button
                        className="btn btn-dark btn-lg"
                        onClick={() => handleSelection("admin")}
                    >
                        Admin Dashboard
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Options;