import React, { useContext, useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import RightSide from "./RightSide";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { authContext, themeContext } from "../../Layout/RootLayout";
import { NavLink } from "react-router";

const Navbar = () => {
    const { user, logOut } = useContext(authContext);
    const { dark, setDark } = useContext(themeContext);

    const [open, setOpen] = useState(false);

    return (
        <header
            className="
            w-full sticky top-0 z-50
            bg-(--color-bg)/70
            backdrop-blur-md
            border-b border-(--color-border)/40
            shadow-sm
        "
        >
            {/* Desktop */}
            <div className="w-11/12 mx-auto h-16 flex items-center justify-between">
                <NavLogo />

                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDark(!dark)}
                        className="h-9 w-9 rounded-full
                        bg-(--color-bg-secondary)
                        flex items-center justify-center
                        text-(--color-text-secondary)"
                        title={dark ? "Light Mode" : "Dark Mode"}
                    >
                        {dark ? <FaSun /> : <FaMoon />}
                    </button>

                    <RightSide user={user} logOut={logOut} />
                </div>

                {/* Mobile menu icon */}
                <div
                    onClick={() => setOpen(true)}
                    className="md:hidden text-2xl text-(--color-text-primary)"
                >
                    <HiMenu />
                </div>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div
                        className="
                        bg-(--color-surface)/70
                        backdrop-blur-lg
                        border border-(--color-border)/40
                    "
                    >
                        {/* Top bar */}
                        <div className="flex items-center justify-between px-4 h-16 border-b border-(--color-border)">
                            <NavLogo />

                            <div className="flex items-center gap-3">
                                {/* Theme Toggle */}
                                <button
                                    onClick={() => setDark(!dark)}
                                    className="h-9 w-9 rounded-full
                                    bg-(--color-bg-secondary)
                                    flex items-center justify-center"
                                >
                                    {dark ? <FaSun /> : <FaMoon />}
                                </button>

                                {user && (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        className="h-9 w-9 rounded-full ring-2 ring-(--color-primary) object-cover"
                                    />
                                )}

                                <div
                                    onClick={() => setOpen(false)}
                                    className="text-2xl"
                                >
                                    <HiX />
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="px-4 py-4 space-y-4">
                            <NavLinks mobile closeMenu={() => setOpen(false)} />

                            {/* Mobile only Login / Register */}
                            {!user && (
                                <div className="flex flex-col gap-2 pt-4 border-t border-(--color-border)">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="w-full py-3 rounded-lg text-center
                                                    bg-(--color-primary) text-white font-medium"
                                    >
                                        Signin/SignUp
                                    </NavLink>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
