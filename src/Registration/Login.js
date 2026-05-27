import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from "react-router";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    async function handleLogin(e) {
        e.preventDefault();

        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);

            })
            .catch((error) => {
                console.log(error);
                setError('Invalid username or password');
            });
    }
    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        {/* Header */}
                        <div className="card-header text-center bg-dark text-white">

                            <h4>Login</h4>

                        </div>

                        {/* Body */}
                        <div className="card-body">

                            <form onSubmit={handleLogin}>

                                {/* Error Message */}
                                {error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>
                                )}

                                {/* Username */}
                                <div className="row mb-3">

                                    <label className="col-sm-3 col-form-label">

                                        Email

                                    </label>

                                    <div className="col-sm-8">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                                {/* Password */}
                                <div className="row mb-3">

                                    <label className="col-sm-3 col-form-label">

                                        Password

                                    </label>

                                    <div className="col-sm-8">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >

                                    Login

                                </button>

                            </form>

                            <hr />

                            {/* Register Link */}
                            <p className="text-center">

                                Don’t have an account?

                                <Link
                                    to="/register"
                                    className="ms-1"
                                >
                                    Register here
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;