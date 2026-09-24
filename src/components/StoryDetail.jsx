import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { HN_API, fetchJson, fetchComment } from "../utils/utils";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from "./Loading";
import CreditBar from "./CreditBar";
import { StoryComments } from "./Comments";

export default function StoryDetail() {
  const { type, storyId } = useParams();

  const {
    data: story,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["hn", "item", storyId],
    queryFn: ({ signal }) =>
      fetchJson(`${HN_API}/item/${storyId}.json`, signal),
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link
            to={`/${type}`}
            className="inline-flex items-center gap-1 text-orange-500 text-sm mb-8"
          >
            <IoIosArrowRoundBack size={20} /> <span>Back</span>
          </Link>
          <div className="max-w-3xl mx-auto px-6 py-8">
            <article>
              <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
                <CreditBar
                  score={story.score}
                  author={story.by}
                  createdAt={story.time}
                  comments={story.descendants}
                />
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed mb-10">
                {story.text && (
                  <div dangerouslySetInnerHTML={{ __html: story.text }} />
                )}
              </div>
            </article>

            <hr className="border-gray-200 mb-6" />
            <h2 className="text-lg font-semibold mb-6">
              {story.descendants} comments
            </h2>

            <div className="space-y-6">
              {story.kids && <StoryComments commentIds={story.kids} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
