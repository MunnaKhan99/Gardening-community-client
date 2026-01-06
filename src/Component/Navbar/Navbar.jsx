import React, { useContext, useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import RightSide from "./RightSide";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { authContext } from "../../Layout/RootLayout";

const Navbar = () => {
    const { user, logOut } = useContext(authContext);
    const [open, setOpen] = useState(false);
    console.log(logOut);

    return (
        <header className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            {/* Desktop */}
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <NavLogo />

                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className="h-9 w-9 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)]">
                        <FaMoon />
                    </button>

                    <RightSide user={user} logOut={logOut} />
                </div>

                {/* Mobile menu icon */}
                <button
                    onClick={() => setOpen(true)}
                    className="md:hidden text-2xl text-[var(--color-text-primary)]"
                >
                    <HiMenu />
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="bg-[var(--color-surface)] min-h-screen">

                        {/* Top bar */}
                        <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--color-border)]">
                            <NavLogo />

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                                    <FaMoon />
                                </div>

                                {user && (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        className="h-9 w-9 rounded-full ring-2 ring-[var(--color-primary)] object-cover"
                                    />
                                )}

                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-2xl"
                                >
                                    <HiX />
                                </button>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="px-4 py-4">
                            <NavLinks mobile closeMenu={() => setOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
