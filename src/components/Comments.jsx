import { React } from "react";
import { renderComments } from "../utils/utils";
import { convertTime } from "./CreditBar";

export function Comment({ id }) {
  const { data: comment, isLoading } = renderComments(id);

  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (!comment) return null;
  return (
    <div>
      <div className="flex items-center gap-2 text-sm mb-1">
        <span className="font-semibold">{comment.author}</span>
        <span className="text-gray-500">
          {convertTime(new Date(comment.createdAt))}
        </span>
      </div>
      <p
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />

      {comment.children.length > 0 && (
        <div className="pl-6 border-l border-gray-200 space-y-4">
          {comment.children.map((child) => (
            <Comment key={child.id} id={child.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export function StoryComments({ commentIds }) {
  return (
    <div className="space-y-6">
      {commentIds.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </div>
  );
}
