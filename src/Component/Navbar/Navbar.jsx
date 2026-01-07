import React, { useContext, useEffect, useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import RightSide from "./RightSide";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { authContext, themeContext } from "../../Layout/RootLayout";

const Navbar = () => {
    const { user, logOut } = useContext(authContext);
    const { dark, setDark } = useContext(themeContext)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.setAttribute("data-theme", "dark");
        }
        else {
            document.documentElement.setAttribute("data-theme", "");
        }
    }, [dark])
    return (
        <header className="w-full sticky top-0 z-50
             bg-[var(--color-bg)]/70
             backdrop-blur-md
             border-b border-[var(--color-border)]/40
             shadow-sm">
            {/* Desktop */}
            <div className="w-11/12 mx-auto  h-16 flex items-center justify-between">
                <NavLogo />

                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button onClick={() => { setDark(!dark) }} className="h-9 w-9 rounded-full bg-(--color-bg-secondary) flex items-center justify-center text-(--color-text-secondary)">
                        <FaMoon />
                    </button>

                    <RightSide user={user} logOut={logOut} />
                </div>

                {/* Mobile menu icon */}
                <button
                    onClick={() => setOpen(true)}
                    className="md:hidden text-2xl text-(--color-text-primary)"
                >
                    <HiMenu />
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="bg-[var(--color-surface)]/70
             backdrop-blur-lg
             border border-[var(--color-border)]/40">

                        {/* Top bar */}
                        <div className="flex items-center justify-between px-4 h-16 border-b border-(--color-border)">
                            <NavLogo />

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-(--color-bg-secondary) flex items-center justify-center">
                                    <FaMoon />
                                </div>

                                {user && (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        className="h-9 w-9 rounded-full ring-2 ring-(--color-primary) object-cover"
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
