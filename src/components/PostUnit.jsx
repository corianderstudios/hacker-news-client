import { FiExternalLink } from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiCircleQuestion } from "react-icons/ci";
import { BiShow } from "react-icons/bi";

import CreditBar from "./CreditBar";

export default function PostUnit({
  author,
  url,
  title,
  score,
  createdAt,
  comments,
  type,
}) {
  return (
    <li className="p-4 flex items-center w-full">
      <div className="text-md mr-4">{linkTypeIcon(url, type)}</div>
      <div className="min-w-0 flex-1">
        <a href={url} className="min-w-0 font-medium">
          {title}
        </a>
        <CreditBar
          score={score}
          author={author}
          createdAt={createdAt}
          comments={comments}
        />
      </div>
    </li>
  );
}

function linkTypeIcon(url, type) {
  switch (type) {
    case "job":
      return <BsSuitcaseLg size={22} />;
      break;
    case "show":
      return <BiShow size={22} />;
      break;
    case "question":
      return <CiCircleQuestion size={22} />;
      break;
    default:
      if (!url || !type) return <MdOutlineArticle size={22} />;
      if (!url.includes("news.ycombinator")) {
        return <FiExternalLink size={22} />;
      }
      break;
  }
}
