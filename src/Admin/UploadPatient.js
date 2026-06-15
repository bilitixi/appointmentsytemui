import React, { useState } from "react";
import api from "../api";
import {useNavigate} from "react-router";

function UploadPatients() {
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("names_file", file);

        try {
            setLoading(true);

            await api.post(
                "/createpatients/",
                formData,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Patients created successfully.");
            navigate("/managepatients");
        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="names_file" className="form-label">
                        Select Excel File
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="names_file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Patients..."
                        : "Upload and Create Patients"}
                </button>
            </form>

            {loading && (
                <div className="alert alert-info mt-3">
                    Please wait. The system is creating patients from the Excel
                    file...
                </div>
            )}

            <div className="mt-4">
                <h5>Expected Excel Format:</h5>
                <ul>
                    <li>email</li>
                    <li>password</li>
                    <li>first_name</li>
                    <li>last_name</li>
                    <li>date_of_birth</li>
                    <li>address</li>
                </ul>
            </div>
        </div>
    );
}

export default UploadPatients;