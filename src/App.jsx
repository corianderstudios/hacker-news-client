import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { GoHome } from "react-icons/go";
import { CiCircleQuestion } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BsSuitcaseLg } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import Logo from "./assets/icons/Logo.jsx";

const links = [
  { to: "/new", label: "New", icon: GoHome },
  { to: "/ask", label: "Ask", icon: CiCircleQuestion },
  { to: "/show", label: "Show", icon: BiShow },
  { to: "/job", label: "Jobs", icon: BsSuitcaseLg },
];

export function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="layout">
      <nav id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="flex items center">
          <Logo size={25} /> <p>Hacker News</p>
        </div>

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}

      <div className="main-wrapper">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="sidebar"
          >
            <IoMdMenu size={22} />
          </button>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
