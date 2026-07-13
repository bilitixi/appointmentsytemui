import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import api from "../api";
import PageLoader from "./LoadingSpinner";

function ProtectedRoute({ role, children }) {
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const token = localStorage.getItem("token");
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(
                    "/me/",
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                setIsValid(true);

                const role = response.data.is_staff
                    ? "admin"
                    : "patient";

                setUserRole(role);
            } catch (error) {
                setIsValid(false);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [token]);

    if (loading) {
        return <PageLoader text="Checking authentication..." />;
    }

    if (!isValid) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Role check
    if (role && userRole !== role) {
        return <Navigate to="/error" />;
    }

    return children;
}

export default ProtectedRoute;