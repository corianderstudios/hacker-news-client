import React from "react";
import { NavLink, Outlet } from "react-router";

import { GoHome } from "react-icons/go";
import { CiCircleQuestion } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BsSuitcaseLg } from "react-icons/bs";

export function Layout() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <NavLink to="/" end>
          <GoHome />
          <span className="ml-1">New</span>
        </NavLink>
        <NavLink to="/ask">
          <CiCircleQuestion />
          <span className="ml-1">Ask</span>
        </NavLink>
        <NavLink to="/show">
          <BiShow />
          <span className="ml-1">Show</span>
        </NavLink>
        <NavLink to="/job">
          <BsSuitcaseLg />
          <span className="ml-1">Jobs</span>
        </NavLink>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
