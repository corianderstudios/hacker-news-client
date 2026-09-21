import React, { useState, useEffect } from "react";
import { useInfiniteQuery, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";

import PostUnit from "./PostUnit";
import Loading from "./Loading";
import Error from "./Error";
import PageTitle from "./PageTitle";
import LoadMoreButton from "./LoadMoreButton";

import { HN_API, PAGE_SIZE, fetchPage, fetchJson } from "../utils/utils";

export default function Jobs() {
  const { type = "job" } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["hn", "job"],
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
          <PageTitle title="Jobs" subtitle="These are jobs at YC startups" />
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
                  type="job"
                />
              ),
            )}
          </ul>
          <LoadMoreButton
            callback={fetchNextPage}
            type="job"
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </section>
  );
}
