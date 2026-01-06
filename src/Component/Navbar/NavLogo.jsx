import React from "react";
import { FaLeaf } from "react-icons/fa";
import "../../Component/style/navlogo.css";

const NavLogo = () => {
    return (
        <div className="nav-logo flex items-center gap-2 cursor-pointer">
            <span className="nav-logo-icon flex h-9 w-9 items-center justify-center rounded-full">
                <FaLeaf className="text-lg" />
            </span>

            <h1 className="nav-logo-text text-xl sm:text-2xl font-semibold tracking-tight">
                Culti<span className="nav-logo-accent">V8</span>
            </h1>
        </div>
    );
};

export default NavLogo;
