import React from "react";
import { useNavigate } from "react-router";
import { FaLeaf, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
            <div className="max-w-md w-full text-center bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-soft)] p-8 border border-[var(--color-border)]">

                {/* Icon */}
                <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-primary)] text-2xl">
                    <FaLeaf />
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-2">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                    The page you are looking for doesn’t exist or may have been moved.
                    Please check the URL or return to the homepage.
                </p>

                {/* Action */}
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <FaArrowLeft />
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
