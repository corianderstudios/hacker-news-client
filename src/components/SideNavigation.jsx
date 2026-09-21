import React from "react";
import { GoHome } from "react-icons/go";
import { CiCircleQuestion } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BsSuitcaseLg } from "react-icons/bs";

const navClasses = "flex items-center";

export default function SideNavigation() {
  return (
    <section className="flex text-left p-8 border-r-2">
      <ul>
        <li className={navClasses}>
          <GoHome />
          <span className="ml-1">New</span>
        </li>
        <li className={navClasses}>
          <CiCircleQuestion />
          <span className="ml-1">Ask</span>
        </li>
        <li className={navClasses}>
          <BiShow />
          <span className="ml-1">Show</span>
        </li>
        <li className={navClasses}>
          <BsSuitcaseLg />
          <span className="ml-1">Jobs</span>
        </li>
      </ul>
    </section>
  );
}
