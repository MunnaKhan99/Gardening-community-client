import React, { useContext } from "react";
import { NavLink } from "react-router";
import { authContext } from "../../Layout/RootLayout";

const navItems = [
  { name: "Home", path: "/", private: false },
  { name: "Explore Gardeners", path: "/explore-gardener", private: false },
  { name: "Browse Tips", path: "/browse-tips", private: false },
  { name: "Share Tips", path: "/share-tips", private: true },
  { name: "My Tips", path: "/my-tips", private: true },
];

const NavLinks = ({ mobile = false, closeMenu }) => {
  const { user } = useContext(authContext);

  return (
    <nav className={mobile ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {navItems.map((item) => {
        if (item.private && !user) return null;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              `
              ${mobile ? "px-4 py-3 rounded-lg" : "px-4 py-2 rounded-full"}
              text-sm font-medium transition-all
              ${isActive
                ? "bg-(--color-primary) text-white"
                : "text-(--color-text-secondary) hover:bg-(--color-primary-soft)"
              }
            `
            }
          >
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavLinks;
