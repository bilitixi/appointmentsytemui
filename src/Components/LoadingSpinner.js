import React from "react";

export function ButtonSpinner({ className = "" }) {
    return (
        <span
            className={`spinner-border spinner-border-sm me-2 ${className}`}
            role="status"
            aria-hidden="true"
        ></span>
    );
}

export function PageLoader({ text = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-border text-primary mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-muted">{text}</div>
        </div>
    );
}

export default PageLoader;
