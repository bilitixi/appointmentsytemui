import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    const token = localStorage.getItem("token");
    const location = useLocation();

    useEffect(() => {

        if (!token) {
            setIsValid(false);
            setLoading(false);
            return;
        }

        axios.get("http://127.0.0.1:8000/check_auth/", {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(() => {
            setIsValid(true);
        })
        .catch(() => {
            setIsValid(false);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [token]);

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    if (!isValid) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;