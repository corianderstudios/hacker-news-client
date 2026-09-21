import React from "react";

export default function Loader({ size = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      height={size}
      width={size}
      className="motion-safe:animate-spin flex-1"
    >
      <path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z" />
    </svg>
  );
}
