import React from "react";

import { MdExpandMore } from "react-icons/md";

export default function LoadMoreButton({
  callback,
  type = "articles",
  hasNextPage,
  isFetchingNextPage,
}) {
  return (
    <button
      onClick={() => callback()}
      disabled={!hasNextPage || isFetchingNextPage}
      className={`border rounded-md p-2 ml-4 cursor-pointer ${!hasNextPage ? "cursor-none" : ""}`}
    >
      {isFetchingNextPage ? (
        "Loading more..."
      ) : hasNextPage ? (
        <div className="flex items-center">
          More <MdExpandMore />
        </div>
      ) : (
        `No more ${type}s`
      )}
    </button>
  );
}
