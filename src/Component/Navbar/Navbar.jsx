import React, { useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import RightSide from "./RightSide";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full .bg-\[var\(--color-surface\)\] {
                            background-color: var(--color-surface);
                            } border-b .border-\[var\(--color-border\)\] {
                            border-color: var(--color-border);
                            }">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Left */}
                <NavLogo />

                {/* Center (Desktop) */}
                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                {/* Right (Desktop) */}
                <div className="hidden md:flex">
                    <RightSide />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-2xl .text-\[var\(--color-text-primary\)\] {
                                color: var(--color-text-primary);
                                }"
                >
                    {open ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden .bg-\[var\(--color-surface\)\] {
                                background-color: var(--color-surface);}
                                border-t .border-\[var\(--color-border\)\] {
                                border-color: var(--color-border);
                                } px-4 py-4 space-y-2">
                    <NavLinks mobile />
                    <div className="pt-3">
                        <RightSide full />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
