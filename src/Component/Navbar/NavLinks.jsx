import React from "react";
import { NavLink } from "react-router";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore Gardeners", path: "/explore-gardener" },
  { name: "Browse Tips", path: "/browse-tips" },
  { name: "Share a Garden Tip", path: "/share" },
  { name: "My Tips", path: "/my-tips" },
];

const NavLinks = ({ mobile = false, closeMenu }) => {
  return (
    <nav className={mobile ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={closeMenu}
          className={({ isActive }) =>
            `
            ${mobile ? "px-4 py-3 rounded-lg" : "px-4 py-2 rounded-full"}
            text-sm font-medium transition-all
            ${
              isActive
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-soft)]"
            }
          `
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
