import React from "react";
import { FaLeaf } from "react-icons/fa";

const NavLogo = () => {
    return (
        <div className="flex items-center gap-2 cursor-pointer">
            <span className="h-9 w-9 flex items-center justify-center rounded-full bg-(--color-primary) text-white">
                <FaLeaf />
            </span>

            <h1 className="text-xl font-semibold text-(--color-text-primary)">
                Garden<span className="text-(--color-primary)">Hub</span>
            </h1>
        </div>
    );
};

export default NavLogo;
