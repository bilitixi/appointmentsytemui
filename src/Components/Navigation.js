import { Link, useNavigate } from "react-router";
import { useState } from "react";
import api from "../api";
import { ButtonSpinner } from "./LoadingSpinner";

function Navigation() {

    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    // check if user is logged in
    const isAuthenticated =
        localStorage.getItem("token");

    async function handleLogout() {
        const token = localStorage.getItem("token");
        setLoggingOut(true);
        try {
            await api.get(
                "/logout/",
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }


        localStorage.removeItem("token");
        navigate("/login");
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                {/* Brand */}
                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Piki Ora Medical Centre
                </Link>

                {/* Mobile Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        {/* Home */}
                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Home
                            </Link>

                        </li>

                        {/* If Logged In */}
                        {isAuthenticated ? (

                            <li className="nav-item">

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-link nav-link"
                                    disabled={loggingOut}
                                >
                                    {loggingOut && <ButtonSpinner />}
                                    Logout
                                </button>

                            </li>

                        ) : (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </Link>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navigation;