import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";

import PostUnit from "./PostUnit";
import Loading from "./Loading";
import Error from "./Error";
import PageTitle from "./PageTitle";
import LoadMoreButton from "./LoadMoreButton";

import { queryResults, VALID_TYPES } from "../utils/utils";

export default function Stories() {
  const { type = "new" } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = queryResults(type);

  const { title, desc } = getPageTitle(type);

  if (!VALID_TYPES.includes(type)) {
    return <Navigate to="/new" replace />;
  }

  const articles = data?.pages.flatMap((page) => page.items) ?? [];

  if (isError) return <Error message={error.message} />;

  return (
    <section className="flex-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={title} subtitle={desc} />
          <ul className="list-none">
            {articles.map(
              ({ by, url, id, title, score, time, descendants }) => (
                <PostUnit
                  key={id}
                  author={by}
                  url={url}
                  title={title}
                  id={id}
                  score={score}
                  createdAt={time}
                  comments={descendants}
                  type={type}
                />
              ),
            )}
          </ul>
          <LoadMoreButton
            callback={fetchNextPage}
            type={type}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </section>
  );
}

export function getPageTitle(type) {
  switch (type) {
    case "new":
    default:
      return {
        title: "New",
        desc: "Discover the latest submissions in the Hacker News community.",
      };
      break;
    case "ask":
      return {
        title: "Ask",
        desc: "Questions, we've all got them.",
      };
      break;
    case "job":
      return {
        title: "Jobs",
        desc: "These are jobs at YC startups",
      };
      break;
    case "show":
      return {
        title: "Show",
        desc: (
          <>
            Please read the Show HN{" "}
            <a
              href="https://news.ycombinator.com/showhn.html"
              className="hover:text-amber-500 cursor-pointer underline"
            >
              rules
            </a>{" "}
            and{" "}
            <a
              href="https://news.ycombinator.com/item?id=22336638"
              className="hover:text-amber-500 cursor-pointer underline"
            >
              tips
            </a>{" "}
            before posting. You can browse the newest Show HNs{" "}
            <a
              href="https://news.ycombinator.com/shownew"
              className="hover:text-amber-500 cursor-pointer underline"
            >
              {" "}
              here
            </a>
            .
          </>
        ),
      };
      break;
  }
}
