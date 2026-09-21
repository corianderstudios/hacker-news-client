import React, { useState, useEffect } from "react";
import { useInfiniteQuery, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";

import PostUnit from "./PostUnit";
import Loading from "./Loading";
import Error from "./Error";
import PageTitle from "./PageTitle";
import LoadMoreButton from "./LoadMoreButton";

import { HN_API, PAGE_SIZE, fetchPage, fetchJson } from "../utils/utils";

export default function Presentations() {
  const { type = "show" } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["hn", "show"],
    queryFn: ({ pageParam, signal }) => fetchPage({ type, pageParam, signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset < lastPage.total ? lastPage.nextOffset : undefined,
  });

  if (isError) return <Error message={error.message} />;
  const questions = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className="flex-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageTitle
            title="Show"
            subtitle={
              <>
                Please read the Show HN{" "}
                <a
                  href="https://news.ycombinator.com/showhn.html"
                  className="hover:text-amber-500 cursor-pointer"
                >
                  rules{" "}
                </a>{" "}
                and
                <a
                  href="https://news.ycombinator.com/item?id=22336638"
                  className="hover:text-amber-500 cursor-pointer"
                >
                  {" "}
                  tips{" "}
                </a>
                before posting. You can browse the newest Show HNs{" "}
                <a
                  href="https://news.ycombinator.com/shownew"
                  className="hover:text-amber-500 cursor-pointer"
                >
                  {" "}
                  here
                </a>
                .
              </>
            }
          />
          <ul className="list-none">
            {questions.map(
              ({ by, url, title, id, score, time, descendants }) => (
                <PostUnit
                  author={by}
                  url={url}
                  title={title}
                  id={id}
                  score={score}
                  createdAt={time}
                  comments={descendants}
                  type="show"
                />
              ),
            )}
          </ul>
          <LoadMoreButton
            callback={fetchNextPage}
            type="presentation"
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </section>
  );
}
