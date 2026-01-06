import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const RightSide = ({ user, logOut }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    console.log(logOut);

    if (!user) {
        return (
            <button onClick={() => navigate('/login')} className="px-5 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium">
                Login / Sign Up
            </button>
        );
    }

    return (
        <div className="relative">
            <img
                onClick={() => setOpen(!open)}
                src={user.photoURL}
                alt="avatar"
                className="h-9 w-9 rounded-full ring-2 ring-[var(--color-primary)] cursor-pointer"
            />

            {open && (
                <div className="absolute right-0 mt-3 w-60 rounded-xl bg-[var(--color-surface)] shadow-lg border border-[var(--color-border)]">
                    <div className="px-4 py-3 border-b border-[var(--color-border)]">
                        <p className="font-medium">{user.displayName || "Google User"}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                            {user.email}
                        </p>
                    </div>

                    <button onClick={() => logOut()} className="w-full px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-red-50">
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default RightSide;
